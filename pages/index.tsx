import { useState } from "react";
import type { GetServerSideProps } from "next";
import "semantic-ui-css/semantic.min.css";
import { Loader } from "semantic-ui-react";
import styles from "../styles/dog.module.css";

interface SearchCatImage {
  id: string;
  url: string;
  height: number;
  width: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await res.json();
  console.log(data[0]);
  return data[0];
};

export default function Home({ initialCatImageUrl }: IndexPageProps) {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setIsLoading(false);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.font_add}>朝の癒しを</h1>
      {isLoading ? (
        <Loader active inline="centered" />
      ) : (
        <img
          className={styles.img_add}
          src={catImageUrl}
          width={500}
          height="auto"
        ></img>
      )}
      <button
        className={styles.button_add}
        style={{ marginTop: 18 }}
        onClick={handleClick}
      >
        今日も1日頑張ろう
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};
