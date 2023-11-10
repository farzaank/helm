export default function getBenchmarkEndpoint(path: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  return `${window.BENCHMARK_OUTPUT_BASE_URL.replace(/\/$/, "")}/${path.replace(
    /^\//,
    "",
  )}`;
}
