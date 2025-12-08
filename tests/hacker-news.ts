import { getHackerNewsFavorites } from "../fetchers/hacker-news";
import { transformHackerNews } from "../transformers/hacker-news";

async function test() {
  console.log("🔍 Fetching Hacker News favorites...\n");

  try {
    const items = await getHackerNewsFavorites();
    console.log(`✅ Fetched ${items.length} items\n`);

    if (items.length > 0) {
      console.log("📋 Sample items (first 3):\n");
      items.slice(0, 3).forEach((item, index) => {
        console.log(`${index + 1}. ${item.title}`);
        console.log(`   Points: ${item.points}`);
        console.log(`   Comments: ${item.comments}`);
        console.log(`   Date: ${item.date}`);
        console.log(`   URL: ${item.url}`);
        console.log(`   ID: ${item.id}`);
        console.log("");
      });

      console.log("🔄 Transforming to timeline items...\n");
      const timelineItems = transformHackerNews(items);
      console.log(`✅ Transformed ${timelineItems.length} items\n`);

      if (timelineItems.length > 0) {
        console.log("📋 Sample timeline item:\n");
        const sample = timelineItems[0];
        console.log(JSON.stringify(sample, null, 2));
        console.log("\n✅ Test completed successfully!");
      }
    } else {
      console.log("⚠️  No items found. This might be expected if the favorites page is empty or requires authentication.");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    }
    process.exit(1);
  }
}

test();

