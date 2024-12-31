
export function add(a: number, b: number): number {
    return a + b;
}

export function divide(a: number, b: number): number {
    return a / b;
}

export function isPalindrome(s: string): boolean {
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    return cleaned === cleaned.split("").reverse().join("");
}

export function findMaxAndIndex(arr: number[]): { max: number; index: number } | null {
    if (arr.length === 0) return null;
    let max = arr[0];
    let index = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
            index = i;
        }
    }
    return { max, index };
}

interface User {
    id: number;
    name: string;
    email: string;
}

export function fetchAndValidateUser(userId: number): Promise<User | null> {
    if (userId <= 0) return Promise.reject(new Error("Invalid user ID"));

    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }
            return response.json() as Promise<User>;
        })
        .then((user) => {
            if (!user.name || !user.email) {
                console.error("Invalid user data");
                return null;
            }
            return user;
        });
}

interface Post {
    id: number;
    title: string;
}

export function fetchPostsAndComments(): Promise<{ posts: Post[]; comments: any[] }> {
    const postsUrl = "https://jsonplaceholder.typicode.com/posts";
    const commentsUrl = "https://jsonplaceholder.typicode.com/comments";

    return Promise.all([
        fetch(postsUrl),
        fetch(commentsUrl)
    ]).then(([postsResponse, commentsResponse]) => {
        if (!postsResponse.ok || !commentsResponse.ok) {
            throw new Error("Failed to fetch posts or comments");
        }

        return Promise.all([
            postsResponse.json() as Promise<Post[]>,
            commentsResponse.json() as Promise<any[]>
        ]);
    }).then(([posts, comments]) => {
        return { posts, comments };
    });
}


interface ServiceStatus {
    service: string;
    status: "success" | "failure";
}

export function distributedTransaction(
    services: string[],
    simulateServiceCall: (service: string) => Promise<ServiceStatus>
): Promise<void> {
    const results: ServiceStatus[] = [];
    const rollbackActions: (() => Promise<void>)[] = [];

    return services.reduce((promiseChain, service) => {
        return promiseChain.then(() => 
            simulateServiceCall(service)
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