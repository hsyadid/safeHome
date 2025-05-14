import Article from "../../../../modules/artikel";

export default function ArticlePage({ params }: { params: { id: string } }) {
  return <Article params={params} />;
}