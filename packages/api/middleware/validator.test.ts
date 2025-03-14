import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import { validateQueryParam } from "./validator"; 
describe("validateQueryParam middleware", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    // create mock request, response, and next function
    req = {
      query: {},
    } as unknown as Request;
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    next = vi.fn();
  });

  it("should return 400 if query param is missing", () => {
    validateQueryParam(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "query param is required",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should remove special characters, leading and trailing spaces", () => {
    req.query.query = "   United@ Kingdom   ";
    validateQueryParam(req, res, next);

    expect(req.query.query).toBe("United Kingdom");
    expect(next).toHaveBeenCalled();
  });

  it("should call next() if query param is already sanitized", () => {
    req.query.query = "hello world";
    validateQueryParam(req, res, next);
    expect(req.query.query).toBe("hello world");
    expect(next).toHaveBeenCalled();
  });
});
