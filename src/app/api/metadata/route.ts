import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    console.log("Fetching metadata for URL:", url);

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Try to get the best possible image
    const getImage = () => {
      const ogImage = $('meta[property="og:image"]').attr("content");
      const twitterImage = $('meta[name="twitter:image"]').attr("content");
      const imageSrc = $('link[rel="image_src"]').attr("href");
      const itemPropImage = $('img[itemprop="image"]').attr("src");

      const firstLargeImage = $("img")
        .toArray()
        .map((img) => $(img).attr("src"))
        .find((src) => {
          const imgUrl = src?.toLowerCase();
          return (
            imgUrl &&
            !imgUrl.includes("icon") &&
            !imgUrl.includes("logo") &&
            !imgUrl.includes("avatar") &&
            imgUrl.match(/\.(jpg|jpeg|png|webp)(\?.*)?$/i)
          );
        });

      console.log("Found images:", {
        ogImage,
        twitterImage,
        imageSrc,
        itemPropImage,
        firstLargeImage,
      });

      return (
        ogImage || twitterImage || imageSrc || itemPropImage || firstLargeImage
      );
    };

    const metadata = {
      title:
        $('meta[property="og:title"]').attr("content") ||
        $('meta[name="twitter:title"]').attr("content") ||
        $("title").text() ||
        "",
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        "",
      image: getImage(),
    };

    // Make image URL absolute if it's relative
    if (metadata.image && !metadata.image.startsWith("http")) {
      const baseUrl = new URL(url);
      const absoluteImageUrl = new URL(
        metadata.image,
        baseUrl.origin
      ).toString();
      console.log("Converting relative image URL to absolute:", {
        relative: metadata.image,
        absolute: absoluteImageUrl,
      });
      metadata.image = absoluteImageUrl;
    }

    console.log("Final metadata:", metadata);
    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}
