/* eslint-disable @typescript-eslint/naming-convention */


export interface DockerEventI {
    Type: string;
    Action: string;
    Actor: {
        ID: string;
        Attributes: Record<string, string>;
    };
    time: number;
    timeNano: number;
}
