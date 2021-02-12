import { stringify } from "querystring";
import type { DockerEventI } from "./DockerEventI";
import type { DockerEventOptionsI } from "./DockerEventOptionsI";
import type { DockerSocket } from "./DockerSocket";

/**
 * Provides ability to bind to docker events endpoint.
 */
export class DockerEvents {

    public constructor(
        private readonly dockerSocket: DockerSocket
    ) { }

    public connect(
        eventHandler: (data: DockerEventI) => void,
        errorHandler: (e: Error) => void,
        eventOptions: DockerEventOptionsI
    ): void {

        const queryString = stringify({
            filters: JSON.stringify(eventOptions.filters),
            since: eventOptions.since,
            until: eventOptions.until,
        });

        this.dockerSocket.stream(eventHandler, errorHandler, `/events?${queryString}`);
    }
}


