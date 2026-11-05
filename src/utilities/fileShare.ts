import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { API_BASE_URL } from "@/config/api.config";
import type { MediaResponseDto } from "@/dtos/media/MediaResponseDto";
import { sessionStorage } from "./secureStorage";

/**
 * Downloads a stored file with the user's token (files are never public links), saves it to the cache,
 * and opens the share sheet so it can be viewed, saved, or sent.
 */
export async function downloadAndShare(media: MediaResponseDto): Promise<void> {
  const token = await sessionStorage.token();
  const destination = new File(Paths.cache, media.fileName);
  if (destination.exists) destination.delete();
  const file = await File.createDownloadTask(API_BASE_URL + media.downloadPath, destination, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  }).downloadAsync();
  if (!file) throw new Error("The download was interrupted.");
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri, { mimeType: media.contentType, dialogTitle: media.fileName });
  }
}
