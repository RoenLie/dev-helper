import type NodePowershell from "node-powershell";
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

export const invoker = (commands, onData) => {
    const ps: NodePowershell = new shell({
        executionPolicy: "Bypass",
        noProfile: true,
    });

    ps.streams.stdout.on("data", (data) => onData(data));

    commands(ps);

    ps.invoke()
        .then((output) => {
            console.log(output);
        })
        .catch((err) => {
            console.log(err);
            ps.dispose();
        });
};