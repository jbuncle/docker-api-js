/* eslint-disable @typescript-eslint/naming-convention */


interface Address {
    Addr: string;
    PrefixLen: number;
}


export interface DockerInspectI {
    Id: string;
    Created: string;
    Path: string;
    Args: string[];
    State: {
        Status: "created" | "dead" | "exited" | "paused" | "removing" | "restarting" | "running";
        Running: boolean;
        Paused: boolean;
        Restarting: boolean;
        OOMKilled: boolean;
        Dead: boolean;
        Pid: boolean;
        ExitCode: boolean;
        Error: boolean;
        StartedAt: boolean;
        FinishedAt: boolean;
        Health: {
            Status: "healthy" | "none" | "starting" | "unhealthy";
            FailingStreak: number;
            Log: {
                Start: string;
                End: string;
                ExitCode: number;
                Output: string;
            }[];
        };
    };
    Image: string;
    ResolvConfPath: string;
    HostnamePath: string;
    LogPath: string;
    Name: string;
    RestartCount: string;
    Driver: string;
    Platform: string;
    MountLabel: string;
    ProcessLabel: string;
    AppArmorProfile: string;
    ExecIds?: string[];
    HostConfig: unknown;
    GraphDriver: unknown;
    SizeRw: number;
    SizeRootFs: number;
    Mounts: unknown[];
    Config: {
        Hostname: string;
        Domainname: string;
        User: string;
        AttachStdin: boolean;
        AttachStdout: boolean;
        AttachStderr: boolean;
        ExposedPorts: Record<string, unknown>;
        Tty: boolean;
        OpenStdin: boolean;
        StdinOnce: boolean;
        Env: string[];
        Cmd: string[];
        Healthcheck: {
            Test: string[];
            Interval: number;
            Timeout: number;
            Retries: number;
            StartPeriod: number;
        };
        ArgsEscaped: boolean;
        Image: string;
        Volumes: unknown;
        WorkingDir: string;
        Entrypoint: string[];
        NetworkDisabled: boolean;
        MacAddress: string;
        OnBuild: string[];
        Labels: Record<string, string>;
        StopSignal: string;
        StopTimeout: string;
        Shell: string[];
    };
    NetworkSettings: {
        Bridge: string;
        SandboxID: string;
        HairpinMode: boolean;
        LinkLocalIPv6Address: string;
        LinkLocalIPv6PrefixLen: number;
        Ports?: Record<string, {
            HostIp: string;
            HostPort: string;
        }[]>;
        SandboxKey: string;
        SecondaryIPAddresses?: Address[];
        SecondaryIPv6Addresses?: Address[];
        EndpointID: string;
        Gateway: string;
        GlobalIPv6Address: string;
        GlobalIPv6PrefixLen: number;
        IPAddress: string;
        IPPrefixLen: number;
        IPv6Gateway: string;
        MacAddress: string;
        Networks: Record<string, {
            IPAMConfig?: {
                IPv4Address: string;
                IPv6Address: string;
                LinkLocalIPs: string[];
            };
            Links: string[];
            Aliases: string[];
            NetworkID: string;
            EndpointID: string;
            Gateway: string;
            IPAddress: string;
            IPPrefixLen: number;
            IPv6Gateway: string;
            GlobalIPv6Address: string;
            GlobalIPv6PrefixLen: number;
            MacAddress: string;
            DriverOpts?: Record<string, string>;
        }>;
    };
}
