
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

export async function fetchAndValidateUser(userId: number): Promise<User | null> {
    if (userId <= 0) throw new Error("Invalid user ID");

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user");

    const user = await response.json() as User;

    if (!user.name || !user.email) {
        console.error("Invalid user data");
        return null;
    }

    return user;
}

interface Post {
    id: number;
    title: string;
}

export async function fetchPostsAndComments(): Promise<{ posts: Post[]; comments: any[] }> {
    const postsUrl = "https://jsonplaceholder.typicode.com/posts";
    const commentsUrl = "https://jsonplaceholder.typicode.com/comments";
    const [postsResponse, commentsResponse] = await Promise.all([
        fetch(postsUrl),
        fetch(commentsUrl)
    ]);
    if (!postsResponse.ok || !commentsResponse.ok) {
        throw new Error("Failed to fetch posts or comments");
    }
    const posts = await postsResponse.json() as Post[];
    const comments = await commentsResponse.json() as any[];
    return { posts, comments };
}


interface ServiceStatus {
    service: string;
    status: "success" | "failure";
}

export async function distributedTransaction(services: string[], simulateServiceCall: (service: string) => Promise<ServiceStatus>): Promise<void> {
    const results: ServiceStatus[] = [];
    const rollbackActions: (() => Promise<void>)[] = [];

    for (const service of services) {
        try {
            const result = await simulateServiceCall(service);
            results.push(result);
            rollbackActions.push(async () => {
                console.log(`Rolling back ${service}`);
            });
        } catch (err) {
            console.error(err);
            for (const rollback of rollbackActions.reverse()) {
                await rollback();
            }
            throw new Error("Distributed transaction failed");
        }
    }
    console.log("All services completed successfully:", results);
}