import type { ClientRequest, IncomingMessage, RequestOptions } from "http";
import { request } from "http";
import { ObjectUtils } from "@jbuncle/core-js";


/**
 * DockerSocket
 */
export class DockerSocket {

    public constructor(
        private readonly socketPath: string = `/var/run/docker.sock`
    ) { }



    public async post<T extends string>(path: string, postData: string = ``): Promise<Record<string, never> | T> {
        const options: RequestOptions = {
            socketPath: `/var/run/docker.sock`,
            path,
            method: `POST`,
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": `application/json`,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Length": postData.length,
            },
        };

        return new Promise((resolve, reject) => {
            const req: ClientRequest = request(options, (res) => {
                res.setEncoding(`utf8`);
                let rawData: string = ``;
                res.on(`data`, (data: string) => {
                    rawData += data;
                });
                res.on(`end`, () => {
                    // End
                    if (rawData === ``) {
                        resolve({});
                    } else {
                        const responseData: Record<string, unknown> = JSON.parse(rawData) as Record<string, unknown>;

                        if (ObjectUtils.hasProperty(responseData, `message`)) {
                            const error: { message: string } = responseData as { message: string };
                            reject(new Error(error.message));
                        } else {
                            resolve(responseData as unknown as T);
                        }
                    }
                });
            });

            req.on(`error`, (error) => {
                reject(error);
            });
            req.write(postData);
            req.end();
        });
    }

    /**
     * 
     * @param Path
     */
    public async get<T>(path: string): Promise<T> {

        const options: RequestOptions = {
            socketPath: this.socketPath,
            path,
        };
        return new Promise((
            resolve: (value: PromiseLike<T> | T) => void,
            reject: (reason?: unknown) => void
        ) => {
            const req: ClientRequest = request(options, (res: IncomingMessage) => {
                res.setEncoding(`utf8`);
                let rawData = ``;
                res.on(`data`, (chunk: string) => {
                    rawData += chunk;
                });
                res.on(`end`, () => {
                    const responseData: Record<string, unknown> = JSON.parse(rawData) as Record<string, unknown>;

                    if (ObjectUtils.hasProperty(responseData, `message`)) {
                        const error: { message: string } = responseData as { message: string };
                        reject(new Error(error.message));
                    } else {
                        resolve(responseData as unknown as T);
                    }
                });
            });

            req.on(`error`, (error) => {
                reject(error);
            });
            req.end();
        });

    }

    public stream<T>(
        eventHandler: (data: T) => void,
        errorHandler: (e: Error) => void,
        path: string,
    ): void {

        const options: RequestOptions = {
            socketPath: `/var/run/docker.sock`,
            path,
        };

        const req: ClientRequest = request(options, (res: IncomingMessage) => {
            res.setEncoding(`utf8`);
            res.on(`data`, (chunk: string) => {
                const json: unknown = JSON.parse(chunk);
                if (Object.prototype.hasOwnProperty.call(json, `message`) === true) {
                    const message: { message: string } = json as { message: string };
                    errorHandler(new Error(message.message))
                } else {
                    eventHandler(JSON.parse(chunk) as T);
                }
            });
            res.on(`end`, () => {
                // Ended
            });
        });

        req.on(`error`, (error: Error) => {
            errorHandler(error);
        });
        req.end();
    }
}
