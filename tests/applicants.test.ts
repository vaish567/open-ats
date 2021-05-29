import { createRequest, createResponse } from "node-mocks-http";
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
      applicant: applicant,
    });
  });

  test("Gets all applicants", async () => {
    const applicantList = [
      // Mock data
      {
        name: "Jose Valerio",
        position: "Developer",
      },
      {
        name: "Vaishnav Parte",
        position: "Developer",
      },
    ];
    const req = createRequest<NextApiRequest>({
      method: "GET",
      body: {
        applicantList,
      },
    });

    const res = createResponse<NextApiResponse>();

    await applicants(req, res);

    expect(res.status).toBe(200);
    expect(res._getJSONData()).toMatchObject({ applicants: Array });
  });
});
