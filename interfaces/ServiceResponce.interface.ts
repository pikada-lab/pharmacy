interface ServiceRespone<I> {
    subscribe(callback: (data: I) => void): void;
}
