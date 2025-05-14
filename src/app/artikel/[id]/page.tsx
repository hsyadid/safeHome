import Article from "../../../../modules/artikel";

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  return <Article params={params} />;
}
