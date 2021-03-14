export class File {
    fileInfo: FileInfo;
    path: string;
    _id?: string;
    constructor() {
      this.fileInfo = new FileInfo();
    }
}

export class FileInfo {
    // lastModified: number;
    // lastModifiedDate: Date;
    name: string;
    size: number;
    file_type: string;
    ownerId: string;
    // webkitRelativePath: string;
  constructor() {
  }
}
