import fs from "fs";
import path from "path";
import ErrorHandler from "./error.handler.js";

export const moveFile = async (
  file,
  newName,
  storage,
  allowedMimeTypes = [],
  maxSize = 0
) => {
  try {
    // Validasi tipe file
    if (
      allowedMimeTypes.length > 0 &&
      !allowedMimeTypes.includes(file.mimetype)
    ) {
      console.error("[ERROR] File type is not allowed:", file.mimetype);
      return { status: false, message: "File type is not allowed" };
    }

    // Validasi ukuran file
    if (maxSize > 0 && file.size > maxSize * 1024 * 1024) {
      console.error("[ERROR] File size too large:", file.size);
      return { status: false, message: "File size is too large" };
    }

    // **Pastikan folder "contract" ada**
    const folderPath = path.resolve("public", storage);
    await fs.promises.mkdir(folderPath, { recursive: true });

    // **Path file tujuan**
    const extension = path.extname(file.name);
    const filePath = path.join(folderPath, `${newName}${extension}`);

    // Hapus file lama jika sudah ada
    await unlinkFile(filePath);

    // **Pindahkan file**
    await file.mv(filePath);

    return {
      status: true,
      message: "File uploaded successfully",
      path: `${storage}/${newName}${extension}`,
    };
  } catch (error) {
    ErrorHandler({ message: "Failed to move file", error });
    console.error("[ERROR] moveFile gagal:", error);
    return { status: false, message: "File upload failed" };
  }
};

export const unlinkFile = async (filePath) => {
  try {
    if (!filePath) {
      return { status: true, message: "No file to delete" };
    }

    const cleanPath = filePath.startsWith("/")
      ? filePath.substring(1)
      : filePath;
    const realPath = path.resolve("public", cleanPath);

    if (fs.existsSync(realPath)) {
      await fs.promises.unlink(realPath);
      return { status: true, message: "File deleted successfully" };
    } else {
      console.warn("[WARN] File tidak ditemukan, dilewati:", realPath);
      return { status: true, message: "File not found, skipped" };
    }
  } catch (error) {
    console.error("[ERROR] unlinkFile gagal:", error);

    if (error.code === "ENOENT") {
      console.warn("[WARN] File already deleted or never existed:", filePath);
      return { status: true, message: "File not found" };
    } else if (error.code === "EACCES") {
      console.error("[ERROR] Permission denied:", filePath);
      return { status: false, message: "Permission denied to delete file" };
    } else if (error.code === "EBUSY") {
      console.error("[ERROR] File is busy:", filePath);
      return { status: false, message: "File is currently in use" };
    }

    return {
      status: false,
      message: `Failed to delete file: ${error.message}`,
    };
  }
};
