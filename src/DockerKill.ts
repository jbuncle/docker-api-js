import { stringify } from "querystring";
import type { DockerSocket } from "./DockerSocket";

/**
 * Class for sending SIGHUP signal to a container.
 */
export class DockerKill {

    public constructor(
        private readonly dockerSocket: DockerSocket
    ) { }

    public async kill(id: string, signal: string = `SIGKILL`): Promise<void> {

        const data = {
            signal,
        };
        const queryString = stringify(data);
        const path: string = `/containers/${id}/kill?${queryString}`;

        await this.dockerSocket.post(path);
    }
}
