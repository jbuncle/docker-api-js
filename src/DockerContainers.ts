import { stringify } from "querystring";
import type { DockerContainerI } from "./DockerContainerI";
import type { DockerSocket } from "./DockerSocket";

/**
 * Provides ability to bind to docker events.
 */
export class DockerContainers {

    public constructor(
        private readonly dockerSocket: DockerSocket
    ) { }

    public async list(
        all?: boolean,
        limit?: number,
        size?: boolean,
        filters?: Record<string, string[]>
    ): Promise<DockerContainerI[]> {

        const data: {
            all?: boolean;
            limit?: number;
            size?: boolean;
            filters?: string;
        } = {
            all: all,
            limit: limit,
            size: size,
            filters: JSON.stringify(filters),
        };
        const queryString = stringify(data);

        return this.dockerSocket.get(`/containers/json?${queryString}`);
    }
}


