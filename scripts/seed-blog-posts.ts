/**
 * Seed script — inserts hardcoded BLOG_POSTS from data.ts into Supabase blog_posts table.
 * Run with: npx tsx scripts/seed-blog-posts.ts
 */

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Hardcoded blog posts from data.ts — duplicated here to avoid import.meta.env issues
const BLOG_POSTS = [
  {
    slug: "what-should-i-do-if-my-roof-is-leaking",
    title: "What Should I Do If My Roof Is Leaking?",
    date: "January 5, 2026",
    category: "Roof Maintenance",
    excerpt: "Discovering a roof leak can be stressful. Here are the 9 essential steps every Charleston homeowner should take to minimize damage and get their roof repaired quickly.",
    content: "Discovering a roof leak is one of the most stressful experiences a homeowner can face, especially during Charleston's stormy season. The key is to act quickly and methodically to minimize damage while getting professional help on the way.\n\n**Step 1: Stay Safe First**\nIf water is coming through the ceiling near electrical fixtures, turn off power to that area. Never touch electrical equipment in standing water.\n\n**Step 2: Limit Interior Water Damage**\nPlace buckets under active drips. Move furniture and valuables away from the affected area. If the ceiling is bulging with water, carefully puncture it with a screwdriver to release the water in a controlled manner into a bucket.\n\n**Step 3: Identify the Leak Source**\nLook for the obvious entry point — but remember, water often travels along rafters before dripping, so the ceiling stain may not be directly below the roof damage.\n\n**Step 4: Take Photos and Notes**\nDocument everything for your insurance claim. Photograph the interior damage, any visible exterior damage, and the overall condition of your roof.\n\n**Step 5: Avoid Quick DIY Fixes**\nResist the urge to climb on a wet roof. Temporary patches from the inside (like roofing tape or sealant) can help in an emergency, but leave the exterior repair to professionals.\n\n**Step 6: Call a Local Roofing Professional**\nContact a licensed, local roofer immediately. At Restoration Roofing, we offer 24/7 emergency service and can often respond same-day to active leaks.\n\n**Step 7: Understand How SC Weather Affects Roof Leaks**\nCharleston's unique climate — with heavy rainfall, high humidity, and hurricane-force winds — means leaks can develop and worsen quickly. What starts as a small drip during a thunderstorm can become significant water damage during the next heavy rain.\n\n**Step 8: Check Your Insurance Coverage**\nMost homeowners insurance policies cover sudden, accidental roof damage (like storm damage) but not gradual wear and tear. We can help you understand what's covered and assist with the claims process.\n\n**Step 9: Plan for Next Steps**\nOnce the immediate emergency is addressed, work with your roofer to develop a plan for permanent repair. This may involve a full inspection to identify any additional issues that aren't immediately visible.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    slug: "preparing-your-roof-for-severe-weather-in-charleston",
    title: "Preparing Your Roof For Severe Weather In Charleston",
    date: "October 14, 2025",
    category: "Storm Preparation",
    excerpt: "Hurricane season in Charleston demands proactive roof preparation. Learn the essential steps to protect your home before the next big storm.",
    content: "Charleston's hurricane season runs from June through November, and preparation is the key to protecting your home. A well-maintained roof is your first line of defense against severe weather.\n\n**Pre-Season Inspection**\nSchedule a professional roof inspection before hurricane season begins. Our team checks for loose or damaged shingles, compromised flashing, and any weak points that could fail under high winds.\n\n**Secure Loose Materials**\nLoose shingles, ridge caps, and flashing are the first things to fail in high winds. Having these secured before a storm is far less expensive than emergency repairs afterward.\n\n**Clean Your Gutters**\nClogged gutters during a heavy storm can cause water to back up under your roofline, leading to leaks and water damage. Ensure gutters are clear and downspouts are directing water away from your foundation.\n\n**Trim Overhanging Branches**\nLive oaks and palmetto trees are beautiful, but overhanging branches become projectiles in hurricane-force winds. Trim any branches within 10 feet of your roof.\n\n**Know Your Insurance Coverage**\nReview your homeowners insurance policy before storm season. Understand your deductible (many coastal SC policies have separate wind/hail deductibles) and document your roof's current condition with photos.\n\n**Have an Emergency Plan**\nKeep our number — (843) 306-2939 — saved in your phone. We offer 24/7 emergency response and can have a crew on-site quickly for emergency tarping after a storm passes.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  {
    slug: "top-roofing-material-choices-for-charleston-homes",
    title: "Top Roofing Material Choices For Charleston Homes",
    date: "October 14, 2025",
    category: "Roofing Materials",
    excerpt: "Choosing the right roofing material for Charleston's coastal climate is critical. Compare the best options for hurricane resistance, salt air durability, and energy efficiency.",
    content: "Charleston's coastal climate presents unique challenges that make roofing material selection especially important. Salt-laden air accelerates corrosion, intense UV degrades materials faster, and hurricane-force winds test every fastener and seal.\n\n**Architectural Asphalt Shingles**\nThe most popular choice for Charleston homes, modern architectural shingles offer excellent value with wind ratings up to 150 mph. Look for algae-resistant (AR) versions with copper granules to prevent the black streaking common in our humid climate. Lifespan: 25-30 years.\n\n**Standing Seam Metal Roofing**\nThe premium choice for coastal homes, standing seam metal roofs can withstand 140+ mph winds and last 50+ years. The concealed fastener design prevents salt air corrosion at attachment points. Higher upfront cost but exceptional long-term value. Lifespan: 40-70 years.\n\n**Slate Roofing**\nIdeal for Charleston's historic homes, natural slate is virtually immune to salt air, algae, and UV damage. It's the longest-lasting roofing material available but requires structural support for its weight. Lifespan: 75-100+ years.\n\n**Concrete and Clay Tile**\nExcellent for Mediterranean and Spanish-style homes in the area. Naturally resistant to salt air and fire, with good wind resistance when properly installed. Lifespan: 50+ years.\n\n**TPO Membrane (Flat Roofs)**\nThe best option for flat and low-slope commercial and residential roofs. White TPO reflects heat, reducing cooling costs, and handles our heavy rainfall well with proper drainage. Lifespan: 20-30 years.\n\nThe right choice depends on your home's architecture, your budget, and your long-term plans. We're happy to walk you through the options and help you make the best decision for your specific situation.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    slug: "how-to-handle-emergency-roof-repairs-in-charleston",
    title: "How To Handle Emergency Roof Repairs In Charleston",
    date: "October 14, 2025",
    category: "Emergency Services",
    excerpt: "When a storm damages your roof, quick action is essential. Here's your step-by-step guide to handling emergency roof repairs in the Charleston area.",
    content: "Emergency roof damage requires immediate action to prevent further damage to your home. Whether it's a fallen tree limb, wind-stripped shingles, or hurricane damage, here's what to do.\n\n**Immediate Steps:**\n1. Ensure everyone's safety — stay away from downed power lines and structural damage\n2. Document damage with photos and video from safe vantage points\n3. Call Restoration Roofing at (843) 306-2939 — we respond 24/7\n4. If safe, place tarps over exposed areas from inside the attic\n5. Move valuables away from water intrusion areas\n\n**What NOT to Do:**\n- Don't climb on a damaged roof\n- Don't sign contracts with storm chasers who appear after storms\n- Don't make permanent repairs before your insurance adjuster inspects\n- Don't throw away damaged materials — they're evidence for your claim\n\n**The Insurance Process:**\nWe handle insurance claims every day. Our process includes thorough damage documentation, direct communication with your adjuster, and advocacy to ensure fair claim settlement. We'll guide you through every step.\n\n**Beware of Storm Chasers:**\nAfter major storms, out-of-state contractors flood the area offering quick fixes. Always verify SC licensing (ours is RBC 694), check reviews, and never pay large deposits upfront.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  {
    slug: "navigating-insurance-claims-for-roof-damage-in-charleston",
    title: "Navigating Insurance Claims for Roof Damage in Charleston",
    date: "October 14, 2025",
    category: "Insurance Claims",
    excerpt: "Filing a roof damage insurance claim can be overwhelming. Our step-by-step guide helps Charleston homeowners navigate the process and get fair compensation.",
    content: "Dealing with roof damage is stressful enough without the added complexity of insurance claims. As Charleston's roof insurance claim experts, we've helped hundreds of homeowners navigate this process successfully.\n\n**Understanding Your Policy:**\nMost homeowners policies cover sudden, accidental damage (storms, fallen trees, hail) but not gradual wear and tear. Many coastal SC policies have separate wind/hail deductibles that may be higher than your standard deductible.\n\n**Step-by-Step Claims Process:**\n1. Document all damage immediately with photos and video\n2. Contact your insurance company to file a claim\n3. Call Restoration Roofing — we'll provide a professional damage assessment\n4. Meet with the insurance adjuster (we'll be there with you)\n5. Review the adjuster's report and settlement offer\n6. If the settlement is fair, authorize repairs\n7. If not, we'll help you supplement the claim with additional documentation\n\n**How We Help:**\nAt Restoration Roofing, we take the insurance burden off your shoulders. We document damage thoroughly, communicate directly with adjusters, and ensure nothing is overlooked in the assessment. We do this every day — it's one of our core specialties.\n\n**Common Claim Pitfalls:**\n- Waiting too long to file (most policies have time limits)\n- Not documenting pre-existing conditions\n- Accepting the first offer without review\n- Making permanent repairs before the adjuster's inspection\n- Not understanding your deductible structure",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    slug: "how-long-does-a-roof-last",
    title: "How Long Does A Roof Last?",
    date: "October 6, 2025",
    category: "Roof Maintenance",
    excerpt: "The lifespan of your roof depends on materials, installation quality, and Charleston's coastal climate. Here's what to expect from each roofing type.",
    content: "One of the most common questions we receive is 'How long will my roof last?' The answer depends on several factors, with material choice and our coastal climate being the most significant.\n\n**Roofing Material Lifespans in Charleston's Climate:**\n- 3-Tab Asphalt Shingles: 15-20 years\n- Architectural Asphalt Shingles: 25-30 years\n- Standing Seam Metal: 40-70 years\n- Slate: 75-100+ years\n- Concrete/Clay Tile: 50+ years\n- TPO/EPDM (Flat): 20-30 years\n\n**Factors That Affect Lifespan in Charleston:**\nSalt air corrosion can reduce metal component life by 30-50% if non-coastal-grade materials are used. UV exposure degrades asphalt shingles faster than in northern climates. Humidity promotes algae and moss growth that can deteriorate shingles. Hurricane-force winds can cause premature failure of improperly installed roofing.\n\n**Extending Your Roof's Life:**\nRegular maintenance is the single best investment you can make. Annual inspections, prompt repairs, gutter cleaning, and algae treatment can add 5-10 years to your roof's lifespan. In our coastal climate, proactive maintenance is even more important than in inland areas.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    slug: "maintaining-your-roof-in-the-summer",
    title: "Maintaining Your Roof in the Summer to Prevent High Energy Bills and Costly Repairs",
    date: "July 6, 2025",
    category: "Roof Maintenance",
    excerpt: "Charleston's brutal summers put extra stress on your roof. Learn how proper summer maintenance can reduce energy costs and prevent expensive repairs.",
    content: "Charleston's summers bring intense heat, UV radiation, and afternoon thunderstorms that test your roof's durability. Proper summer maintenance not only extends your roof's life but can significantly reduce your cooling costs.\n\n**Check Your Ventilation:**\nProper attic ventilation is critical in our climate. Without adequate airflow, attic temperatures can exceed 150\u00b0F, baking your shingles from below and driving up cooling costs. Ensure ridge vents, soffit vents, and any powered ventilators are functioning properly.\n\n**Inspect After Storms:**\nSummer thunderstorms can damage shingles, dislodge flashing, and clog gutters with debris. After any significant storm, do a visual inspection from the ground and call us if you notice anything concerning.\n\n**Address Algae Growth:**\nThe combination of heat and humidity makes summer prime time for algae growth on roofs. Those black streaks aren't just unsightly — they can actually damage shingles over time. Professional treatment can remove existing growth and prevent recurrence.\n\n**Clean Your Gutters:**\nSummer storms bring heavy, fast rainfall. Clogged gutters can cause water to back up under your roofline, leading to leaks and fascia damage. Clean gutters at least twice during summer.\n\n**Consider Reflective Coatings:**\nIf your roof is nearing the end of its life, a reflective roof coating can extend its lifespan while reducing cooling costs by reflecting solar heat away from your home.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    slug: "spring-roofing-maintenance-safety-and-tips",
    title: "Spring Roofing Maintenance Safety and Tips",
    date: "April 7, 2025",
    category: "Roof Maintenance",
    excerpt: "Spring is the ideal time to prepare your Charleston roof for the demands of summer heat and hurricane season. Here's your complete spring maintenance checklist.",
    content: "Spring in Charleston is the perfect time to assess your roof's condition and address any issues before the heat of summer and the start of hurricane season.\n\n**Spring Maintenance Checklist:**\n1. Schedule a professional inspection\n2. Clean gutters and downspouts\n3. Check flashing around chimneys, vents, and skylights\n4. Look for winter storm damage (missing or lifted shingles)\n5. Inspect attic for signs of moisture or leaks\n6. Trim tree branches near the roof\n7. Check ventilation systems\n8. Address any algae or moss growth\n\n**Safety First:**\nNever walk on a wet or steep roof. Use binoculars for ground-level inspections. If you need a closer look, call a professional — we offer free inspections and can safely assess your roof's condition.\n\n**Preparing for Hurricane Season:**\nSpring maintenance is also your opportunity to prepare for hurricane season (June-November). Securing loose materials, reinforcing vulnerable areas, and ensuring your roof is in peak condition before storms arrive is far less expensive than emergency repairs afterward.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    slug: "the-best-roofing-options-for-year-round-protection",
    title: "The Best Roofing Options for Year-round Protection",
    date: "January 2, 2025",
    category: "Roofing Materials",
    excerpt: "Charleston's climate demands year-round roof performance. Discover which roofing materials offer the best protection through every season.",
    content: "Charleston's climate throws everything at your roof — scorching summer heat, hurricane-force winds, heavy rainfall, and even occasional winter ice. Choosing a roofing material that performs well year-round is essential.\n\n**Summer Performance:**\nReflective metal roofing and light-colored shingles reduce heat absorption, lowering cooling costs during our 90\u00b0F+ summers. Proper ventilation is equally important regardless of material choice.\n\n**Hurricane Season:**\nStanding seam metal roofing offers the best wind resistance (140+ mph). Architectural shingles with Class H wind ratings (150 mph) are also excellent. Proper installation with enhanced fastening patterns is critical in our wind zone.\n\n**Rainy Season:**\nCharleston averages 51 inches of rain annually. All roofing materials must be installed with proper underlayment, flashing, and drainage to handle this volume. Gutters must be properly sized and maintained.\n\n**Year-Round Humidity:**\nOur 70-80% average humidity promotes algae, moss, and mold growth. Algae-resistant shingles, proper ventilation, and regular maintenance are essential for any roofing material in our climate.\n\n**Our Recommendation:**\nFor most Charleston homes, we recommend either premium architectural shingles with algae-resistant technology or standing seam metal roofing with coastal-grade coatings. Both offer excellent year-round performance when properly installed.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
];

/**
 * Parse human-readable date strings like "January 5, 2026" into ISO timestamps.
 */
function parseDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    // Fallback to now if parsing fails
    return new Date().toISOString();
  }
  return d.toISOString();
}

async function seed() {
  console.log(`Seeding ${BLOG_POSTS.length} blog posts into Supabase...`);

  for (const post of BLOG_POSTS) {
    const publishedAt = parseDate(post.date);

    const { data, error } = await supabase
      .from("blog_posts")
      .upsert(
        {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          image: post.image,
          author: "Restoration Roofing SC",
          published: true,
          published_at: publishedAt,
          metadata: { seeded: true },
        },
        { onConflict: "slug" },
      )
      .select("slug")
      .single();

    if (error) {
      console.error(`  FAILED: ${post.slug} — ${error.message}`);
    } else {
      console.log(`  OK: ${data.slug}`);
    }
  }

  console.log("Done.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
