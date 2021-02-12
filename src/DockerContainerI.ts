/* eslint-disable @typescript-eslint/naming-convention */


export interface DockerContainerI {
    Id: string;
    Names: string[];
    Image: string;
    ImageID: string;
    Command: string;
    Created: string;
    Ports: {
        IP: string;
        PrivatePort: number;
        PublicPort: number;
        Type: string;
    }[];
    SizeRw: number;
    SizeRootFs: number;
    Labels: Record<string, string>;
    State: string;
    Status: string;
    HostConfig: {
        NetworkMode: string;
    };
    NetworkSettings: {
        Networks: Record<string, unknown>;
    };
    Mounts: {
        Target: string;
        Source: string;
        Type: "bind" | "npipe" | "tmpfd" | "volume";
        ReadOnly: boolean;
        Consistency: "cached" | "consistent" | "default" | "delegated";
        BindOptions: {
            Propogation: "private" | "rprivate" | "rshared" | "rslave" | "shared" | "slave";
            NonRecursive: boolean;
        };
        VolumeOptions: {
            NoCopy: boolean;
            Labels: Record<string, string>;
            DriverConfig: {
                Name: string;
                Options: Record<string, string>;
            };
        };
        TmpfsOptions: {
            SizeBytes: number;
            Mode: number;
        };

    }[];
}
