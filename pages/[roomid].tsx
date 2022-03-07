import { NextPageContext } from "next";
import { useRouter } from "next/router";

export default function Room() {
  const router = useRouter();
  const { roomid } = router.query;

  return <p className="text-center">{roomid}</p>;
}

export async function getServerSideProps(context: NextPageContext) {
  return { props: {} };
}
