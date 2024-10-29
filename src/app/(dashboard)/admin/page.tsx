import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async () => {

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <h1>Please Login to see this admin page</h1>
    )
  }

  return (
    <div>
      Welcome to admin page: {session?.user.username}
    </div>
  )
}

export default page