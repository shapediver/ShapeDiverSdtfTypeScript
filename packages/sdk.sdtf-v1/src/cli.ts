import * as process from "process"
import { create } from "./SdDtfSdk"

const util = require("util")

const general = {
    help: [ "-h", "--help" ],
}
const command_jsonContent = {
    name: "json-content",
    options: {
        url: [ "-u", "--url" ],
        file: [ "-f", "--file" ],
    },
};

(async () => {
    try {
        const parser = create({}).createParser()

        if (
            process.argv.length < 3 ||
            (process.argv.length === 3 && isHelpArg(process.argv[2]))
        ) {
            printGeneralInfo()

        } else if (process.argv[2] === command_jsonContent.name) {
            if (command_jsonContent.options.url.includes(process.argv[3])) {
                // Fetch and parse via url
                const asset = await parser.readFromUrl(process.argv[4])
                console.log(util.inspect(asset, false, null))
            } else if (command_jsonContent.options.file.includes(process.argv[3])) {
                // Fetch and parse via file path
                const asset = await parser.readFromFile(process.argv[4])
                console.log(util.inspect(asset, false, null))
            } else if (process.argv[3] === undefined || general.help.includes(process.argv[3])) {
                // help or undefined
                printJsonContentCommandInfo()
            } else {
                errExit(`Invalid option '${ process.argv[3] }'.`)
            }
        } else {
            errExit(`Invalid command '${ process.argv[2] }.'`)
        }
    } catch (e) {
        errExit(e.message)
    }
})()

function isHelpArg (arg: any): boolean {
    return general.help.includes(arg)
}

function errExit (msg: string): void {
    console.error("ERROR:", msg)
    process.exit(1)
}

function printGeneralInfo (): void {
    console.log("sdtf <command>", "\n")
    console.log("This is a commandline loader for sdTF (Structured Data Transfer Format) files.", "\n")
    console.log("Commands:")
    console.log("\t", command_jsonContent.name, "-", "Print JSON content of the specified sdTF.")
}

function printJsonContentCommandInfo (): void {
    console.log("sdtf <command>", "command_jsonContent.name", "\n")
    console.log("Fetch and print JSON content of the specified sdTF.", "\n")
    console.log("Options:")
    console.log("\t", general.help.join(", "), "\t", "Show help.")
    console.log("\t", command_jsonContent.options.url.join(", "), "\t", "Fetch sdTF from URL.", [ "string" ])
    console.log("\t", command_jsonContent.options.file.join(", "), "\t", "Read sdTF from file.", [ "string" ])
}
