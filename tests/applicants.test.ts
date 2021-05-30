import { createRequest, createResponse, RequestMethod } from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import applicants from "../pages/api/applicants/index";

describe("/api/applicants", () => {
  test("Creates an applicant with the specified info", async () => {
    const applicant = {
      name: "Jose Valerio",
      position: "Developer",
    };
    const req = createRequest<NextApiRequest>({
      method: "POST",
      body: {
        applicant,
      },
    });

    const res = createResponse<NextApiResponse>();
    await applicants(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toEqual({
      message: "Applicant succesfully created!",
      applicant: {
        name: expect.any(String),
        position: expect.any(String),
        id: expect.any(String),
        created_at: expect.any(String), // TODO can this be clearer to expect ISO Date?
      },
    });
  });

  test("Gets all applicants", async () => {
    const req = createRequest<NextApiRequest>({
      method: "GET",
    });

    const res = createResponse<NextApiResponse>();
    await applicants(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(
      expect.objectContaining({
        applicants: expect.any(Array), // Array of applicants
      })
    );
  });
});
