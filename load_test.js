import { check } from "k6";
import http from "k6/http";

const STRESS_FACTOR = 2;
// const STRESS_FACTOR = 25;
// const STRESS_FACTOR = 250;

export const options = {
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(99)<1000"], // 99% of requests should be below 1s
  },
  stages: [{ duration: "10s", target: 420 }],
};

export default function () {
  const url = `http://localhost:8080/test/${STRESS_FACTOR}`;

  const res = http.get(url, { timeout: "5s" });

  check(res, {
    "response code was 200": (res) => res.status == 200,
  });
}
