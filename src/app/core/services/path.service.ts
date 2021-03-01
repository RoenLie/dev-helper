interface localPaths {
    msBuild: string,
    visualStudio: string,
    cleanup: string,
    base: string;
}


export class PathService {
    constructor() {
        const paths = window.localStorage.getItem("paths");

        if (!paths) {
            const paths = {
                msBuild: "",
                visualStudio: "",
                cleanup: "",
                base: ""
            };
            window.localStorage.setItem("paths", JSON.stringify(paths));
        }
    }

    path = (): localPaths => JSON.parse(window.localStorage.getItem("paths"));
}

export const pathService = new PathService();