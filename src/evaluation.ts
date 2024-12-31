
export function findMaxAndIndex(arr: number[]): { max: number; index: number } | null {
    if (arr.length === 0) return null;
    let max = arr[0];
    let index = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
            index = i + 1;
        }
    }
    return { max, index };
}

interface ServiceStatus {
    service: string;
    status: "success" | "failure";
}

export function distributedTransaction(
    services: string[],
    serviceCall: (service: string) => Promise<ServiceStatus>
): Promise<void> {
    const results: ServiceStatus[] = [];
    const rollbackActions: (() => Promise<void>)[] = [];

    return services.reduce((promiseChain, service) => {
        return promiseChain.then(() =>
            serviceCall(service)
                .then((result) => {
                    results.push(result);
                    rollbackActions.push(() => Promise.resolve(console.log(`Rolling back ${service}`)));
                })
                .catch((err) => {
                    console.error(err);
                    return rollbackActions
                        .reverse()
                        .reduce(
                            (rollbackChain, rollback) => rollbackChain.then(() => rollback()),
                            Promise.resolve()
                        )
                        .then(() => {
                            throw new Error("Distributed transaction failed");
                        });
                })
        );
    }, Promise.resolve()).then(() => {
        console.log("All services completed successfully:", results);
    });
}

export function distributedTransactionSync(
    services: string[],
    serviceCall: (service: string) => ServiceStatus,
    rollbackActionCreator: (service: string) => void
) {
    const results: ServiceStatus[] = [];
    const rollbackActions: (() => void)[] = [];

    for (const service of services) {
        try {
            const result = serviceCall(service);
            results.push(result);

            rollbackActions.push(() => rollbackActionCreator(service));
        } catch (err) {
            console.error(err);
            for (const rollback of rollbackActions.reverse()) {
                rollback();
            }
            throw new Error("Distributed transaction failed");
        }
    }
    console.log("All services completed successfully:", results);
}