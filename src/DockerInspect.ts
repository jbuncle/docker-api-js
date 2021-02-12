import type { DockerInspectI } from "./DockerInspectI";
import type { DockerSocket } from "./DockerSocket";

/**
 * Provides ability to bind to docker events.
 */
export class DockerInspect {

    public constructor(
        private readonly dockerSocket: DockerSocket
    ) { }

    public async inspect(id: string): Promise<DockerInspectI> {

        return this.dockerSocket.get(`/containers/${id}/json`);
    }
}


