export const cleanPwsOutput = (input: string) =>
    input
        .replace(/\[39m..\[94m/g, "<br />")
        .replace(/\[24m|\[36m|\[94m|\[39m|\[35m/g, "")
        .replace(/\[96m|\[4m|\[32m|\[31m/g, "<br />")
        .replace(/%./g, "%<br />");