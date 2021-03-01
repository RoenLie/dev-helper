interface localPaths {
    msBuild: string,
    visualStudio: string,
    cleanup: string,
    base: string;
}


export class PathService {
    constructor() { }

    path = (): localPaths => JSON.parse(window.localStorage.getItem("paths"));
}

export const pathService = new PathService();