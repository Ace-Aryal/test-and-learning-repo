export async function GET(request) {
  try {
    throw new Error("Something broke");
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
