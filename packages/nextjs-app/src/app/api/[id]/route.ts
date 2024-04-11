export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  return Response.json({ name: 'willysliang', id: params.id })
}
