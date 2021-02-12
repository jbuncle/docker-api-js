
export interface DockerEventOptionsI {
    filters?: {
        config?: string[];
        container?: string[];
        daemon?: string[];
        event?: string[];
        image?: string[];
        label?: string[];
        network?: string[];
        node?: string[];
        plugin?: string[];
        scope?: string[];
        secret?: string[];
        service?: string[];
        type?: ("config" | "container" | "daemon" | "image" | "network" | "node" | "plugin" | "secret" | "service" | "volume")[];
        volume?: string[];

    };
    since?: string;
    until?: string;
}
