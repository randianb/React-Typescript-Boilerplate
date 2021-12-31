import React from 'react';
import yamlParser from 'js-yaml';
import { readFileSync } from "fs";
import path from 'path'

export default function Dashboard() {
    const filePath = '/public/data/config.yml'
    try {
        const fullPath: string = path.resolve(process.cwd() + filePath);
        console.log(fullPath);

        const fileContents: string = readFileSync(fullPath, "utf8");
        const data = fileContents;
        console.log(data.toString());
        var yml = yamlParser.load(data.toString())
        console.log(yml)

    } catch (error) {
        console.error(`Got an error trying to read the file: ${error}`);
    }
    return (
        <div></div>
    )
}