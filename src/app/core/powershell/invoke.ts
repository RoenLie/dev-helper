const shell = require("node-powershell");

export interface PowershellScript {
    script: string;
}

export const pwsInvoke = (pws: PowershellScript) => {
    let ps = new shell({
        executionPolicy: "Bypass",
        noProfile: true,
    });

    ps.addCommand(pws.script);
    ps.invoke()
        .then((output) => {
            console.log(output);
        })
        .catch((err) => {
            console.log(err);
            ps.dispose();
        });
};