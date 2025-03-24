declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"articles": {
"2020/04/100-days-of-gatsby.mdx": {
	id: "2020/04/100-days-of-gatsby.mdx";
  slug: "2020/04/100-days-of-gatsby";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2020/05/gatsby-recipes-whats-all-the-fuss-about.mdx": {
	id: "2020/05/gatsby-recipes-whats-all-the-fuss-about.mdx";
  slug: "2020/05/gatsby-recipes-whats-all-the-fuss-about";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2020/05/roll-your-own-comments.mdx": {
	id: "2020/05/roll-your-own-comments.mdx";
  slug: "2020/05/roll-your-own-comments";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2020/07/playful-animated-reactions.mdx": {
	id: "2020/07/playful-animated-reactions.mdx";
  slug: "2020/07/playful-animated-reactions";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2020/09/gatsby-cloud-good-friend.mdx": {
	id: "2020/09/gatsby-cloud-good-friend.mdx";
  slug: "2020/09/gatsby-cloud-good-friend";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2020/10/hacktoberfest-spotlight.mdx": {
	id: "2020/10/hacktoberfest-spotlight.mdx";
  slug: "2020/10/hacktoberfest-spotlight";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2020/12/storybook-addon-mdx-embed.mdx": {
	id: "2020/12/storybook-addon-mdx-embed.mdx";
  slug: "2020/12/storybook-addon-mdx-embed";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/01/bumhub.mdx": {
	id: "2021/01/bumhub.mdx";
  slug: "2021/01/bumhub";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/03/voices-of-gatsby.mdx": {
	id: "2021/03/voices-of-gatsby.mdx";
  slug: "2021/03/voices-of-gatsby";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/04/gatsby-cloud-better-faster-greener.mdx": {
	id: "2021/04/gatsby-cloud-better-faster-greener.mdx";
  slug: "2021/04/gatsby-cloud-better-faster-greener";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/04/getting-started-with-gatsby-source-wordpress-choose-your-own-adventure.mdx": {
	id: "2021/04/getting-started-with-gatsby-source-wordpress-choose-your-own-adventure.mdx";
  slug: "2021/04/getting-started-with-gatsby-source-wordpress-choose-your-own-adventure";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/04/headless-wordpress-future-shapes.mdx": {
	id: "2021/04/headless-wordpress-future-shapes.mdx";
  slug: "2021/04/headless-wordpress-future-shapes";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/04/mdx-embedded-images.mdx": {
	id: "2021/04/mdx-embedded-images.mdx";
  slug: "2021/04/mdx-embedded-images";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/07/gatsby-serverless-functions-and-the-international-space-station.mdx": {
	id: "2021/07/gatsby-serverless-functions-and-the-international-space-station.mdx";
  slug: "2021/07/gatsby-serverless-functions-and-the-international-space-station";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/07/how-we-made-500-bottles.mdx": {
	id: "2021/07/how-we-made-500-bottles.mdx";
  slug: "2021/07/how-we-made-500-bottles";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/09/monetize-open-source-software-gatsby-functions.mdx": {
	id: "2021/09/monetize-open-source-software-gatsby-functions.mdx";
  slug: "2021/09/monetize-open-source-software-gatsby-functions";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/10/building-an-api-with-gatsby-functions.mdx": {
	id: "2021/10/building-an-api-with-gatsby-functions.mdx";
  slug: "2021/10/building-an-api-with-gatsby-functions";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/10/gatsby-funcjam-21-winners.mdx": {
	id: "2021/10/gatsby-funcjam-21-winners.mdx";
  slug: "2021/10/gatsby-funcjam-21-winners";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/11/content-querying-with-gatsby-and-contentful.mdx": {
	id: "2021/11/content-querying-with-gatsby-and-contentful.mdx";
  slug: "2021/11/content-querying-with-gatsby-and-contentful";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/11/deploy-4-swag.mdx": {
	id: "2021/11/deploy-4-swag.mdx";
  slug: "2021/11/deploy-4-swag";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/11/how-to-use-contentfuls-rich-text-editor.mdx": {
	id: "2021/11/how-to-use-contentfuls-rich-text-editor.mdx";
  slug: "2021/11/how-to-use-contentfuls-rich-text-editor";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/11/quick-start-guide-to-gatsby-and-contentful.mdx": {
	id: "2021/11/quick-start-guide-to-gatsby-and-contentful.mdx";
  slug: "2021/11/quick-start-guide-to-gatsby-and-contentful";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/12/become-a-data-champion-with-gatsby.mdx": {
	id: "2021/12/become-a-data-champion-with-gatsby.mdx";
  slug: "2021/12/become-a-data-champion-with-gatsby";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/12/data-champion-dsg.mdx": {
	id: "2021/12/data-champion-dsg.mdx";
  slug: "2021/12/data-champion-dsg";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/12/data-champion-ssg.mdx": {
	id: "2021/12/data-champion-ssg.mdx";
  slug: "2021/12/data-champion-ssg";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/12/data-champion-ssr.mdx": {
	id: "2021/12/data-champion-ssr.mdx";
  slug: "2021/12/data-champion-ssr";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2021/12/gatsby-plugin-not-working-but-why.mdx": {
	id: "2021/12/gatsby-plugin-not-working-but-why.mdx";
  slug: "2021/12/gatsby-plugin-not-working-but-why";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/01/building-gatsbyconf-2022.mdx": {
	id: "2022/01/building-gatsbyconf-2022.mdx";
  slug: "2022/01/building-gatsbyconf-2022";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/01/performance-optimization-for-three-js-web-animations.mdx": {
	id: "2022/01/performance-optimization-for-three-js-web-animations.mdx";
  slug: "2022/01/performance-optimization-for-three-js-web-animations";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/03/how-to-add-custom-fonts-to-gatsby.mdx": {
	id: "2022/03/how-to-add-custom-fonts-to-gatsby.mdx";
  slug: "2022/03/how-to-add-custom-fonts-to-gatsby";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/03/how-to-add-google-analytics-gtag-to-gatsby-using-partytown.mdx": {
	id: "2022/03/how-to-add-google-analytics-gtag-to-gatsby-using-partytown.mdx";
  slug: "2022/03/how-to-add-google-analytics-gtag-to-gatsby-using-partytown";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/04/how-to-migrate-from-netlify-functions-to-gatsby-functions-on-gatsby-cloud.mdx": {
	id: "2022/04/how-to-migrate-from-netlify-functions-to-gatsby-functions-on-gatsby-cloud.mdx";
  slug: "2022/04/how-to-migrate-from-netlify-functions-to-gatsby-functions-on-gatsby-cloud";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/05/building-rise-of-the-robots.mdx": {
	id: "2022/05/building-rise-of-the-robots.mdx";
  slug: "2022/05/building-rise-of-the-robots";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/07/building-rise-of-the-robots-with-gatsby-and-contentful.mdx": {
	id: "2022/07/building-rise-of-the-robots-with-gatsby-and-contentful.mdx";
  slug: "2022/07/building-rise-of-the-robots-with-gatsby-and-contentful";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/09/whats-new-in-gatsby-2022.mdx": {
	id: "2022/09/whats-new-in-gatsby-2022.mdx";
  slug: "2022/09/whats-new-in-gatsby-2022";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/10/how-to-build-svg-line-charts-with-react-ssr-tailwind.mdx": {
	id: "2022/10/how-to-build-svg-line-charts-with-react-ssr-tailwind.mdx";
  slug: "2022/10/how-to-build-svg-line-charts-with-react-ssr-tailwind";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/10/how-to-use-google-sheets-as-a-database-with-react-and-serverless-funcitons.mdx": {
	id: "2022/10/how-to-use-google-sheets-as-a-database-with-react-and-serverless-funcitons.mdx";
  slug: "2022/10/how-to-use-google-sheets-as-a-database-with-react-and-serverless-funcitons";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/11/gatsby-5-upgrade-say-no-to-yolo.mdx": {
	id: "2022/11/gatsby-5-upgrade-say-no-to-yolo.mdx";
  slug: "2022/11/gatsby-5-upgrade-say-no-to-yolo";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/11/how-to-use-function-props-with-gatsbys-slice-api.mdx": {
	id: "2022/11/how-to-use-function-props-with-gatsbys-slice-api.mdx";
  slug: "2022/11/how-to-use-function-props-with-gatsbys-slice-api";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2022/11/what-is-gatsbys-valhalla-content-hub.mdx": {
	id: "2022/11/what-is-gatsbys-valhalla-content-hub.mdx";
  slug: "2022/11/what-is-gatsbys-valhalla-content-hub";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/02/converting-cloud-provider-regions-into-country-flags.mdx": {
	id: "2023/02/converting-cloud-provider-regions-into-country-flags.mdx";
  slug: "2023/02/converting-cloud-provider-regions-into-country-flags";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/02/putting-gears-motion-animating-cars-with-html-svg.mdx": {
	id: "2023/02/putting-gears-motion-animating-cars-with-html-svg.mdx";
  slug: "2023/02/putting-gears-motion-animating-cars-with-html-svg";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/03/dynamic-donut-charts-tailwind-css-react.mdx": {
	id: "2023/03/dynamic-donut-charts-tailwind-css-react.mdx";
  slug: "2023/03/dynamic-donut-charts-tailwind-css-react";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/03/the-distance-from-data-to-you-in-edge-computing.mdx": {
	id: "2023/03/the-distance-from-data-to-you-in-edge-computing.mdx";
  slug: "2023/03/the-distance-from-data-to-you-in-edge-computing";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/04/what-is-the-cockroach-cloud-api.mdx": {
	id: "2023/04/what-is-the-cockroach-cloud-api.mdx";
  slug: "2023/04/what-is-the-cockroach-cloud-api";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/05/the-art-of-data-residency-and-application-architecture.mdx": {
	id: "2023/05/the-art-of-data-residency-and-application-architecture.mdx";
  slug: "2023/05/the-art-of-data-residency-and-application-architecture";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/06/how-to-create-a-multi-region-nodejs-lambda-api.mdx": {
	id: "2023/06/how-to-create-a-multi-region-nodejs-lambda-api.mdx";
  slug: "2023/06/how-to-create-a-multi-region-nodejs-lambda-api";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/09/getting-started-with-neon-branching.mdx": {
	id: "2023/09/getting-started-with-neon-branching.mdx";
  slug: "2023/09/getting-started-with-neon-branching";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/09/how-to-use-postgres-at-the-edge.mdx": {
	id: "2023/09/how-to-use-postgres-at-the-edge.mdx";
  slug: "2023/09/how-to-use-postgres-at-the-edge";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/10/how-to-use-astro-with-a-sprinkling-of-react.mdx": {
	id: "2023/10/how-to-use-astro-with-a-sprinkling-of-react.mdx";
  slug: "2023/10/how-to-use-astro-with-a-sprinkling-of-react";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/10/roll-your-own-analytics-with-astro-vercel-edge-functions-and-neon.mdx": {
	id: "2023/10/roll-your-own-analytics-with-astro-vercel-edge-functions-and-neon.mdx";
  slug: "2023/10/roll-your-own-analytics-with-astro-vercel-edge-functions-and-neon";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/11/how-qwiks-astro-integration-beats-both-react-and-vanilla-js.mdx": {
	id: "2023/11/how-qwiks-astro-integration-beats-both-react-and-vanilla-js.mdx";
  slug: "2023/11/how-qwiks-astro-integration-beats-both-react-and-vanilla-js";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/11/how-to-build-a-server-side-react-app-with-vite-and-express.mdx": {
	id: "2023/11/how-to-build-a-server-side-react-app-with-vite-and-express.mdx";
  slug: "2023/11/how-to-build-a-server-side-react-app-with-vite-and-express";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/11/how-to-create-animated-gifs-from-sap-animations.mdx": {
	id: "2023/11/how-to-create-animated-gifs-from-sap-animations.mdx";
  slug: "2023/11/how-to-create-animated-gifs-from-sap-animations";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/11/im-in-an-open-relationship-with-remix.mdx": {
	id: "2023/11/im-in-an-open-relationship-with-remix.mdx";
  slug: "2023/11/im-in-an-open-relationship-with-remix";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/11/spas-and-react-you-dont-always-need-server-side-rendering.mdx": {
	id: "2023/11/spas-and-react-you-dont-always-need-server-side-rendering.mdx";
  slug: "2023/11/spas-and-react-you-dont-always-need-server-side-rendering";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2023/12/recreating-shopifys-bfcm-globe-using-react-globe-gl.mdx": {
	id: "2023/12/recreating-shopifys-bfcm-globe-using-react-globe-gl.mdx";
  slug: "2023/12/recreating-shopifys-bfcm-globe-using-react-globe-gl";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/01/brighten-up-your-astro-site-with-kwesforms-and-rive.mdx": {
	id: "2024/01/brighten-up-your-astro-site-with-kwesforms-and-rive.mdx";
  slug: "2024/01/brighten-up-your-astro-site-with-kwesforms-and-rive";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/01/take-a-qwik-break-from-react-with-astro.mdx": {
	id: "2024/01/take-a-qwik-break-from-react-with-astro.mdx";
  slug: "2024/01/take-a-qwik-break-from-react-with-astro";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/02/how-to-build-site-search-with-astro-qwik-and-fuse-js.mdx": {
	id: "2024/02/how-to-build-site-search-with-astro-qwik-and-fuse-js.mdx";
  slug: "2024/02/how-to-build-site-search-with-astro-qwik-and-fuse-js";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/02/javascript-on-demand-how-qwik-differs-from-react-hydration.mdx": {
	id: "2024/02/javascript-on-demand-how-qwik-differs-from-react-hydration.mdx";
  slug: "2024/02/javascript-on-demand-how-qwik-differs-from-react-hydration";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/02/simple-data-visualization-astro-contentful.mdx": {
	id: "2024/02/simple-data-visualization-astro-contentful.mdx";
  slug: "2024/02/simple-data-visualization-astro-contentful";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/03/adding-resumability-to-astro-with-qwik.mdx": {
	id: "2024/03/adding-resumability-to-astro-with-qwik.mdx";
  slug: "2024/03/adding-resumability-to-astro-with-qwik";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/03/how-to-build-embed-components-with-astro-qwik-and-stackblitz.mdx": {
	id: "2024/03/how-to-build-embed-components-with-astro-qwik-and-stackblitz.mdx";
  slug: "2024/03/how-to-build-embed-components-with-astro-qwik-and-stackblitz";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/03/say-no-to-ship-it-culture-slow-and-steady-wins-the-race.mdx": {
	id: "2024/03/say-no-to-ship-it-culture-slow-and-steady-wins-the-race.mdx";
  slug: "2024/03/say-no-to-ship-it-culture-slow-and-steady-wins-the-race";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/03/us-tech-cannot-comprehend-the-digital-nomad-way-of-life.mdx": {
	id: "2024/03/us-tech-cannot-comprehend-the-digital-nomad-way-of-life.mdx";
  slug: "2024/03/us-tech-cannot-comprehend-the-digital-nomad-way-of-life";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/04/did-signals-just-land-in-react.mdx": {
	id: "2024/04/did-signals-just-land-in-react.mdx";
  slug: "2024/04/did-signals-just-land-in-react";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/04/how-to-simplify-global-state-management-in-react-using-jotai.mdx": {
	id: "2024/04/how-to-simplify-global-state-management-in-react-using-jotai.mdx";
  slug: "2024/04/how-to-simplify-global-state-management-in-react-using-jotai";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/04/how-to-use-sanity-cms-with-astro.mdx": {
	id: "2024/04/how-to-use-sanity-cms-with-astro.mdx";
  slug: "2024/04/how-to-use-sanity-cms-with-astro";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/04/react-server-components-in-a-nutshell.mdx": {
	id: "2024/04/react-server-components-in-a-nutshell.mdx";
  slug: "2024/04/react-server-components-in-a-nutshell";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/05/automatically-generate-types-for-your-postgresql-database.mdx": {
	id: "2024/05/automatically-generate-types-for-your-postgresql-database.mdx";
  slug: "2024/05/automatically-generate-types-for-your-postgresql-database";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/05/design-system-component-documentation.mdx": {
	id: "2024/05/design-system-component-documentation.mdx";
  slug: "2024/05/design-system-component-documentation";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/05/drizzle-orm-is-sql-in-a-javascript-hat-and-wears-it-well.mdx": {
	id: "2024/05/drizzle-orm-is-sql-in-a-javascript-hat-and-wears-it-well.mdx";
  slug: "2024/05/drizzle-orm-is-sql-in-a-javascript-hat-and-wears-it-well";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/05/getting-started-with-react-vite-and-clerk-auth-on-netlify.mdx": {
	id: "2024/05/getting-started-with-react-vite-and-clerk-auth-on-netlify.mdx";
  slug: "2024/05/getting-started-with-react-vite-and-clerk-auth-on-netlify";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/05/how-to-use-sanity-portable-text-with-astro.mdx": {
	id: "2024/05/how-to-use-sanity-portable-text-with-astro.mdx";
  slug: "2024/05/how-to-use-sanity-portable-text-with-astro";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/05/outer-excuses-why-javascript-developers-should-learn-sql.mdx": {
	id: "2024/05/outer-excuses-why-javascript-developers-should-learn-sql.mdx";
  slug: "2024/05/outer-excuses-why-javascript-developers-should-learn-sql";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/05/why-we-need-a-standard-javascript-orm-for-sql-databases.mdx": {
	id: "2024/05/why-we-need-a-standard-javascript-orm-for-sql-databases.mdx";
  slug: "2024/05/why-we-need-a-standard-javascript-orm-for-sql-databases";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/06/css-in-js-and-react-server-components-a-developer-guide.mdx": {
	id: "2024/06/css-in-js-and-react-server-components-a-developer-guide.mdx";
  slug: "2024/06/css-in-js-and-react-server-components-a-developer-guide";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/06/how-to-schedule-postgresql-backups-with-github-actions.mdx": {
	id: "2024/06/how-to-schedule-postgresql-backups-with-github-actions.mdx";
  slug: "2024/06/how-to-schedule-postgresql-backups-with-github-actions";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/06/how-to-use-github-actions-and-apis-to-surface-important-data.mdx": {
	id: "2024/06/how-to-use-github-actions-and-apis-to-surface-important-data.mdx";
  slug: "2024/06/how-to-use-github-actions-and-apis-to-surface-important-data";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/06/how-to-use-google-sheets-as-a-database-with-react-via-next-js.mdx": {
	id: "2024/06/how-to-use-google-sheets-as-a-database-with-react-via-next-js.mdx";
  slug: "2024/06/how-to-use-google-sheets-as-a-database-with-react-via-next-js";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/07/nextjs-embedded-dashboard.mdx": {
	id: "2024/07/nextjs-embedded-dashboard.mdx";
  slug: "2024/07/nextjs-embedded-dashboard";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/07/real-time-monitoring.mdx": {
	id: "2024/07/real-time-monitoring.mdx";
  slug: "2024/07/real-time-monitoring";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/08/data-visualization-astro-luzmo.mdx": {
	id: "2024/08/data-visualization-astro-luzmo.mdx";
  slug: "2024/08/data-visualization-astro-luzmo";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/08/data-visualization-nextjs-luzmo.mdx": {
	id: "2024/08/data-visualization-nextjs-luzmo.mdx";
  slug: "2024/08/data-visualization-nextjs-luzmo";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/09/how-build-custom-data-visualizations-luzmo-flex.mdx": {
	id: "2024/09/how-build-custom-data-visualizations-luzmo-flex.mdx";
  slug: "2024/09/how-build-custom-data-visualizations-luzmo-flex";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/09/how-create-weekly-google-analytics-report-posts-slack.mdx": {
	id: "2024/09/how-create-weekly-google-analytics-report-posts-slack.mdx";
  slug: "2024/09/how-create-weekly-google-analytics-report-posts-slack";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/10/how-to-create-an-aws-s3-bucket-for-postgres-backups.mdx": {
	id: "2024/10/how-to-create-an-aws-s3-bucket-for-postgres-backups.mdx";
  slug: "2024/10/how-to-create-an-aws-s3-bucket-for-postgres-backups";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/10/nightly-backups-for-multiple-neon-projects.mdx": {
	id: "2024/10/nightly-backups-for-multiple-neon-projects.mdx";
  slug: "2024/10/nightly-backups-for-multiple-neon-projects";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/11/luzmo-iq-tutorial.mdx": {
	id: "2024/11/luzmo-iq-tutorial.mdx";
  slug: "2024/11/luzmo-iq-tutorial";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2024/11/migrating-schemas.mdx": {
	id: "2024/11/migrating-schemas.mdx";
  slug: "2024/11/migrating-schemas";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2025/02/automate-partial-data-dumps-with-postgresql-and-github-actions.mdx": {
	id: "2025/02/automate-partial-data-dumps-with-postgresql-and-github-actions.mdx";
  slug: "2025/02/automate-partial-data-dumps-with-postgresql-and-github-actions";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2025/02/reliable-testing-dataset-with-pg-dump-and-pg-restore.mdx": {
	id: "2025/02/reliable-testing-dataset-with-pg-dump-and-pg-restore.mdx";
  slug: "2025/02/reliable-testing-dataset-with-pg-dump-and-pg-restore";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2025/03/from-shared-chaos-to-isolated-control-with-neon.mdx": {
	id: "2025/03/from-shared-chaos-to-isolated-control-with-neon.mdx";
  slug: "2025/03/from-shared-chaos-to-isolated-control-with-neon";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2025/03/gihub-actions-self-hosted-runners.mdx": {
	id: "2025/03/gihub-actions-self-hosted-runners.mdx";
  slug: "2025/03/gihub-actions-self-hosted-runners";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"2025/03/vibe-coding-with-ai-to-generate-synthetic-data-part-1.mdx": {
	id: "2025/03/vibe-coding-with-ai-to-generate-synthetic-data-part-1.mdx";
  slug: "2025/03/vibe-coding-with-ai-to-generate-synthetic-data-part-1";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
};
"demos": {
"2021/06/paulie-api.mdx": {
	id: "2021/06/paulie-api.mdx";
  slug: "2021/06/paulie-api";
  body: string;
  collection: "demos";
  data: InferEntrySchema<"demos">
} & { render(): Render[".mdx"] };
"2021/07/500-bottles.mdx": {
	id: "2021/07/500-bottles.mdx";
  slug: "2021/07/500-bottles";
  body: string;
  collection: "demos";
  data: InferEntrySchema<"demos">
} & { render(): Render[".mdx"] };
"2022/03/gatsby-conf-2022.mdx": {
	id: "2022/03/gatsby-conf-2022.mdx";
  slug: "2022/03/gatsby-conf-2022";
  body: string;
  collection: "demos";
  data: InferEntrySchema<"demos">
} & { render(): Render[".mdx"] };
"2022/06/rise-of-the-robots.mdx": {
	id: "2022/06/rise-of-the-robots.mdx";
  slug: "2022/06/rise-of-the-robots";
  body: string;
  collection: "demos";
  data: InferEntrySchema<"demos">
} & { render(): Render[".mdx"] };
"2023/03/edge.mdx": {
	id: "2023/03/edge.mdx";
  slug: "2023/03/edge";
  body: string;
  collection: "demos";
  data: InferEntrySchema<"demos">
} & { render(): Render[".mdx"] };
"2023/04/cockroachdb-cloud-api.mdx": {
	id: "2023/04/cockroachdb-cloud-api.mdx";
  slug: "2023/04/cockroachdb-cloud-api";
  body: string;
  collection: "demos";
  data: InferEntrySchema<"demos">
} & { render(): Render[".mdx"] };
"2023/05/cockroach-db-data-residency.mdx": {
	id: "2023/05/cockroach-db-data-residency.mdx";
  slug: "2023/05/cockroach-db-data-residency";
  body: string;
  collection: "demos";
  data: InferEntrySchema<"demos">
} & { render(): Render[".mdx"] };
"2023/06/cockroach-db-toolbox.mdx": {
	id: "2023/06/cockroach-db-toolbox.mdx";
  slug: "2023/06/cockroach-db-toolbox";
  body: string;
  collection: "demos";
  data: InferEntrySchema<"demos">
} & { render(): Render[".mdx"] };
"2023/09/how-to-use-postgres-at-the-edge.mdx": {
	id: "2023/09/how-to-use-postgres-at-the-edge.mdx";
  slug: "2023/09/how-to-use-postgres-at-the-edge";
  body: string;
  collection: "demos";
  data: InferEntrySchema<"demos">
} & { render(): Render[".mdx"] };
"2023/12/punk-squirrel.mdx": {
	id: "2023/12/punk-squirrel.mdx";
  slug: "2023/12/punk-squirrel";
  body: string;
  collection: "demos";
  data: InferEntrySchema<"demos">
} & { render(): Render[".mdx"] };
"2024/09/dev-for-rds.mdx": {
	id: "2024/09/dev-for-rds.mdx";
  slug: "2024/09/dev-for-rds";
  body: string;
  collection: "demos";
  data: InferEntrySchema<"demos">
} & { render(): Render[".mdx"] };
};
"docs": {
"2025/02/backups-aws-s3-backup-part-1.mdx": {
	id: "2025/02/backups-aws-s3-backup-part-1.mdx";
  slug: "2025/02/backups-aws-s3-backup-part-1";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"2025/02/backups-aws-s3-backup-part-2.mdx": {
	id: "2025/02/backups-aws-s3-backup-part-2.mdx";
  slug: "2025/02/backups-aws-s3-backup-part-2";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"2025/02/neon-twin-full-pg-dump-restore.mdx": {
	id: "2025/02/neon-twin-full-pg-dump-restore.mdx";
  slug: "2025/02/neon-twin-full-pg-dump-restore";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"2025/02/neon-twin-intro.mdx": {
	id: "2025/02/neon-twin-intro.mdx";
  slug: "2025/02/neon-twin-intro";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"2025/02/neon-twin-partial-pg-dump-restore.mdx": {
	id: "2025/02/neon-twin-partial-pg-dump-restore.mdx";
  slug: "2025/02/neon-twin-partial-pg-dump-restore";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"2025/02/use-case-dev-test.mdx": {
	id: "2025/02/use-case-dev-test.mdx";
  slug: "2025/02/use-case-dev-test";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
};
"ghosts": {
"2024/03/enterprise-design-systems.mdx": {
	id: "2024/03/enterprise-design-systems.mdx";
  slug: "2024/03/enterprise-design-systems";
  body: string;
  collection: "ghosts";
  data: InferEntrySchema<"ghosts">
} & { render(): Render[".mdx"] };
"2024/04/what-is-vite-introduction.mdx": {
	id: "2024/04/what-is-vite-introduction.mdx";
  slug: "2024/04/what-is-vite-introduction";
  body: string;
  collection: "ghosts";
  data: InferEntrySchema<"ghosts">
} & { render(): Render[".mdx"] };
"2024/07/development-environments-for-aws-rds-using-neon-postgres.mdx": {
	id: "2024/07/development-environments-for-aws-rds-using-neon-postgres.mdx";
  slug: "2024/07/development-environments-for-aws-rds-using-neon-postgres";
  body: string;
  collection: "ghosts";
  data: InferEntrySchema<"ghosts">
} & { render(): Render[".mdx"] };
"2024/07/optimizing-dev-environments-in-aws-rds-with-neon-postgres-part-ii-using-github-actions-to-mirror-rds-in-neon.mdx": {
	id: "2024/07/optimizing-dev-environments-in-aws-rds-with-neon-postgres-part-ii-using-github-actions-to-mirror-rds-in-neon.mdx";
  slug: "2024/07/optimizing-dev-environments-in-aws-rds-with-neon-postgres-part-ii-using-github-actions-to-mirror-rds-in-neon";
  body: string;
  collection: "ghosts";
  data: InferEntrySchema<"ghosts">
} & { render(): Render[".mdx"] };
"2024/08/building-slack-notifications-to-monitor-pg_dump-and-restore-workflows.mdx": {
	id: "2024/08/building-slack-notifications-to-monitor-pg_dump-and-restore-workflows.mdx";
  slug: "2024/08/building-slack-notifications-to-monitor-pg_dump-and-restore-workflows";
  body: string;
  collection: "ghosts";
  data: InferEntrySchema<"ghosts">
} & { render(): Render[".mdx"] };
"2024/08/neon-twin-deploy-workflow.mdx": {
	id: "2024/08/neon-twin-deploy-workflow.mdx";
  slug: "2024/08/neon-twin-deploy-workflow";
  body: string;
  collection: "ghosts";
  data: InferEntrySchema<"ghosts">
} & { render(): Render[".mdx"] };
"2025/02/instant-branches-schema-only-or-with-data-the-choice-is-yours.mdx": {
	id: "2025/02/instant-branches-schema-only-or-with-data-the-choice-is-yours.mdx";
  slug: "2025/02/instant-branches-schema-only-or-with-data-the-choice-is-yours";
  body: string;
  collection: "ghosts";
  data: InferEntrySchema<"ghosts">
} & { render(): Render[".mdx"] };
};
"opensource": {
"2020/04/mdx-embed.mdx": {
	id: "2020/04/mdx-embed.mdx";
  slug: "2020/04/mdx-embed";
  body: string;
  collection: "opensource";
  data: InferEntrySchema<"opensource">
} & { render(): Render[".mdx"] };
"2023/02/cloud-regions-country-flags.mdx": {
	id: "2023/02/cloud-regions-country-flags.mdx";
  slug: "2023/02/cloud-regions-country-flags";
  body: string;
  collection: "opensource";
  data: InferEntrySchema<"opensource">
} & { render(): Render[".mdx"] };
};
"posts": {
"2019/11/12/gatsby-theme-gatstats.mdx": {
	id: "2019/11/12/gatsby-theme-gatstats.mdx";
  slug: "2019/11/12/gatsby-theme-gatstats";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2019/11/24/gatsby-remark-sticky-table.mdx": {
	id: "2019/11/24/gatsby-remark-sticky-table.mdx";
  slug: "2019/11/24/gatsby-remark-sticky-table";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2019/12/12/gatsby-mdx-routes.mdx": {
	id: "2019/12/12/gatsby-mdx-routes.mdx";
  slug: "2019/12/12/gatsby-mdx-routes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2019/12/26/gatsby-remark-grid-system.mdx": {
	id: "2019/12/26/gatsby-remark-grid-system.mdx";
  slug: "2019/12/26/gatsby-remark-grid-system";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/01/100DaysOfGatsby.mdx": {
	id: "2020/01/100DaysOfGatsby.mdx";
  slug: "2020/01/100daysofgatsby";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/01/gatsby-mdx-embed.mdx": {
	id: "2020/01/gatsby-mdx-embed.mdx";
  slug: "2020/01/gatsby-mdx-embed";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/02/gatsby-theme-terminal.mdx": {
	id: "2020/02/gatsby-theme-terminal.mdx";
  slug: "2020/02/gatsby-theme-terminal";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/02/prop-shop.mdx": {
	id: "2020/02/prop-shop.mdx";
  slug: "2020/02/prop-shop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/04/100DaysOfGatsby-TheRoundup.mdx": {
	id: "2020/04/100DaysOfGatsby-TheRoundup.mdx";
  slug: "2020/04/100daysofgatsby-theroundup";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/04/IntersectionObserver.mdx": {
	id: "2020/04/IntersectionObserver.mdx";
  slug: "2020/04/intersectionobserver";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/04/gatsby-or-theme-ui-link.mdx": {
	id: "2020/04/gatsby-or-theme-ui-link.mdx";
  slug: "2020/04/gatsby-or-theme-ui-link";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/04/gatsby-recipe-storybook-js.mdx": {
	id: "2020/04/gatsby-recipe-storybook-js.mdx";
  slug: "2020/04/gatsby-recipe-storybook-js";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/04/mdx-embedded-images.mdx": {
	id: "2020/04/mdx-embedded-images.mdx";
  slug: "2020/04/mdx-embedded-images";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/04/officially-published.mdx": {
	id: "2020/04/officially-published.mdx";
  slug: "2020/04/officially-published";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/04/skin-ui.mdx": {
	id: "2020/04/skin-ui.mdx";
  slug: "2020/04/skin-ui";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/04/svg-icon-systems.mdx": {
	id: "2020/04/svg-icon-systems.mdx";
  slug: "2020/04/svg-icon-systems";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/04/typescript-theme-ui-link.mdx": {
	id: "2020/04/typescript-theme-ui-link.mdx";
  slug: "2020/04/typescript-theme-ui-link";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/05/gatsby-cli-recipes.mdx": {
	id: "2020/05/gatsby-cli-recipes.mdx";
  slug: "2020/05/gatsby-cli-recipes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/05/gatsby-recipe-storybook-ts.mdx": {
	id: "2020/05/gatsby-recipe-storybook-ts.mdx";
  slug: "2020/05/gatsby-recipe-storybook-ts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/05/mdx-embed-intersection-observer.mdx": {
	id: "2020/05/mdx-embed-intersection-observer.mdx";
  slug: "2020/05/mdx-embed-intersection-observer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/05/roll-your-own-comments.mdx": {
	id: "2020/05/roll-your-own-comments.mdx";
  slug: "2020/05/roll-your-own-comments";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/06/first-ever-donation.mdx": {
	id: "2020/06/first-ever-donation.mdx";
  slug: "2020/06/first-ever-donation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/06/react-svg-bubble-slider.mdx": {
	id: "2020/06/react-svg-bubble-slider.mdx";
  slug: "2020/06/react-svg-bubble-slider";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/07/everythings-a-box.mdx": {
	id: "2020/07/everythings-a-box.mdx";
  slug: "2020/07/everythings-a-box";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/08/gatsby-seo-component.mdx": {
	id: "2020/08/gatsby-seo-component.mdx";
  slug: "2020/08/gatsby-seo-component";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/08/react-hooks-and-matter-js.mdx": {
	id: "2020/08/react-hooks-and-matter-js.mdx";
  slug: "2020/08/react-hooks-and-matter-js";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/08/styled-components-responsive-array-syntax.mdx": {
	id: "2020/08/styled-components-responsive-array-syntax.mdx";
  slug: "2020/08/styled-components-responsive-array-syntax";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/08/styled-components-style-objects.mdx": {
	id: "2020/08/styled-components-style-objects.mdx";
  slug: "2020/08/styled-components-style-objects";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/10/storybook-an-alternative-approach.mdx": {
	id: "2020/10/storybook-an-alternative-approach.mdx";
  slug: "2020/10/storybook-an-alternative-approach";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/11/gatsby-netlify-twitter.mdx": {
	id: "2020/11/gatsby-netlify-twitter.mdx";
  slug: "2020/11/gatsby-netlify-twitter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/11/silly-site-challenge.mdx": {
	id: "2020/11/silly-site-challenge.mdx";
  slug: "2020/11/silly-site-challenge";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/12/2020-top-tweets.mdx": {
	id: "2020/12/2020-top-tweets.mdx";
  slug: "2020/12/2020-top-tweets";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020/best-bits-2020.mdx": {
	id: "2020/best-bits-2020.mdx";
  slug: "2020/best-bits-2020";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/01/gatsby-netliyf-github-rest.mdx": {
	id: "2021/01/gatsby-netliyf-github-rest.mdx";
  slug: "2021/01/gatsby-netliyf-github-rest";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/01/react-svg-doughnut-chart.mdx": {
	id: "2021/01/react-svg-doughnut-chart.mdx";
  slug: "2021/01/react-svg-doughnut-chart";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/01/theme-ui-alpha-1.mdx": {
	id: "2021/01/theme-ui-alpha-1.mdx";
  slug: "2021/01/theme-ui-alpha-1";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/01/theme-ui-alpha-2.mdx": {
	id: "2021/01/theme-ui-alpha-2.mdx";
  slug: "2021/01/theme-ui-alpha-2";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/01/theme-ui-alpha-3.mdx": {
	id: "2021/01/theme-ui-alpha-3.mdx";
  slug: "2021/01/theme-ui-alpha-3";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/01/theme-ui-alpha-4.mdx": {
	id: "2021/01/theme-ui-alpha-4.mdx";
  slug: "2021/01/theme-ui-alpha-4";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/02/theme-ui-alpha-5.mdx": {
	id: "2021/02/theme-ui-alpha-5.mdx";
  slug: "2021/02/theme-ui-alpha-5";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/02/theme-ui-alpha-6.mdx": {
	id: "2021/02/theme-ui-alpha-6.mdx";
  slug: "2021/02/theme-ui-alpha-6";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/03/chart-css.mdx": {
	id: "2021/03/chart-css.mdx";
  slug: "2021/03/chart-css";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/03/file-system-routes-multi-source-mdx.mdx": {
	id: "2021/03/file-system-routes-multi-source-mdx.mdx";
  slug: "2021/03/file-system-routes-multi-source-mdx";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/03/mdx-fold-it-in.mdx": {
	id: "2021/03/mdx-fold-it-in.mdx";
  slug: "2021/03/mdx-fold-it-in";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/03/understanding-theme-ui.mdx": {
	id: "2021/03/understanding-theme-ui.mdx";
  slug: "2021/03/understanding-theme-ui";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/04/gatsby-plugin-image-with-art-direction.mdx": {
	id: "2021/04/gatsby-plugin-image-with-art-direction.mdx";
  slug: "2021/04/gatsby-plugin-image-with-art-direction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/04/sourcing-local-json-files-with-gatsby.mdx": {
	id: "2021/04/sourcing-local-json-files-with-gatsby.mdx";
  slug: "2021/04/sourcing-local-json-files-with-gatsby";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/06/gatsby-abstracted-functions.mdx": {
	id: "2021/06/gatsby-abstracted-functions.mdx";
  slug: "2021/06/gatsby-abstracted-functions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/07/gatsby-create-schema-customization.mdx": {
	id: "2021/07/gatsby-create-schema-customization.mdx";
  slug: "2021/07/gatsby-create-schema-customization";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/07/gatsby-slow-local-build-times.mdx": {
	id: "2021/07/gatsby-slow-local-build-times.mdx";
  slug: "2021/07/gatsby-slow-local-build-times";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/07/gatsby-source-nodes.mdx": {
	id: "2021/07/gatsby-source-nodes.mdx";
  slug: "2021/07/gatsby-source-nodes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/08/gatsby-func-jam-21.mdx": {
	id: "2021/08/gatsby-func-jam-21.mdx";
  slug: "2021/08/gatsby-func-jam-21";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021/best-bits-2021.mdx": {
	id: "2021/best-bits-2021.mdx";
  slug: "2021/best-bits-2021";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/01/use-local-storage.mdx": {
	id: "2022/01/use-local-storage.mdx";
  slug: "2022/01/use-local-storage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/07/how-to-use-gatsbys-head-api-with-mdx.mdx": {
	id: "2022/07/how-to-use-gatsbys-head-api-with-mdx.mdx";
  slug: "2022/07/how-to-use-gatsbys-head-api-with-mdx";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/07/how-to-use-gatsbys-script-api-with-google-analytics.mdx": {
	id: "2022/07/how-to-use-gatsbys-script-api-with-google-analytics.mdx";
  slug: "2022/07/how-to-use-gatsbys-script-api-with-google-analytics";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/08/how-to-use-utterances-with-react.mdx": {
	id: "2022/08/how-to-use-utterances-with-react.mdx";
  slug: "2022/08/how-to-use-utterances-with-react";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/08/mdx-2-breaking-changes-and-gatsby-plugin-mdx-v4.mdx": {
	id: "2022/08/mdx-2-breaking-changes-and-gatsby-plugin-mdx-v4.mdx";
  slug: "2022/08/mdx-2-breaking-changes-and-gatsby-plugin-mdx-v4";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/08/mdx-esm-rehype-packages.mdx": {
	id: "2022/08/mdx-esm-rehype-packages.mdx";
  slug: "2022/08/mdx-esm-rehype-packages";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/08/syntax-highlighting-with-gatsby-mdx-and-prism-react-renderer.mdx": {
	id: "2022/08/syntax-highlighting-with-gatsby-mdx-and-prism-react-renderer.mdx";
  slug: "2022/08/syntax-highlighting-with-gatsby-mdx-and-prism-react-renderer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/09/how-to-use-serverless-fucntions-with-ssr.mdx": {
	id: "2022/09/how-to-use-serverless-fucntions-with-ssr.mdx";
  slug: "2022/09/how-to-use-serverless-fucntions-with-ssr";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/09/how-to-use-tanstack-query-with-gatsby.mdx": {
	id: "2022/09/how-to-use-tanstack-query-with-gatsby.mdx";
  slug: "2022/09/how-to-use-tanstack-query-with-gatsby";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/09/mdx-2-breaking-changes-and-gatsby-plugin-mdx-v4-slug.mdx": {
	id: "2022/09/mdx-2-breaking-changes-and-gatsby-plugin-mdx-v4-slug.mdx";
  slug: "2022/09/mdx-2-breaking-changes-and-gatsby-plugin-mdx-v4-slug";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/10/how-to-create-image-slices-using-sharp.mdx": {
	id: "2022/10/how-to-create-image-slices-using-sharp.mdx";
  slug: "2022/10/how-to-create-image-slices-using-sharp";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/10/react-hydration-error-425-text-content-does-not-match-server-rendered-html.mdx": {
	id: "2022/10/react-hydration-error-425-text-content-does-not-match-server-rendered-html.mdx";
  slug: "2022/10/react-hydration-error-425-text-content-does-not-match-server-rendered-html";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/11/how-to-use-reacts-context-api-with-gatsby.mdx": {
	id: "2022/11/how-to-use-reacts-context-api-with-gatsby.mdx";
  slug: "2022/11/how-to-use-reacts-context-api-with-gatsby";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2022/12/how-to-create-custom-marketo-forms-with-react.mdx": {
	id: "2022/12/how-to-create-custom-marketo-forms-with-react.mdx";
  slug: "2022/12/how-to-create-custom-marketo-forms-with-react";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2023/02/cockroachlabs-interview-app.mdx": {
	id: "2023/02/cockroachlabs-interview-app.mdx";
  slug: "2023/02/cockroachlabs-interview-app";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2023/02/getting-started-with-cockroachdb-pg-promise-and-nextjs.mdx": {
	id: "2023/02/getting-started-with-cockroachdb-pg-promise-and-nextjs.mdx";
  slug: "2023/02/getting-started-with-cockroachdb-pg-promise-and-nextjs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2023/09/how-to-create-excerpts-with-astro.mdx": {
	id: "2023/09/how-to-create-excerpts-with-astro.mdx";
  slug: "2023/09/how-to-create-excerpts-with-astro";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2023/10/how-to-create-an-svg-radar-chart.mdx": {
	id: "2023/10/how-to-create-an-svg-radar-chart.mdx";
  slug: "2023/10/how-to-create-an-svg-radar-chart";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2023/10/what-is-a-proxy-redirect.mdx": {
	id: "2023/10/what-is-a-proxy-redirect.mdx";
  slug: "2023/10/what-is-a-proxy-redirect";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2023/11/a-set-of-sign-In-with-google-buttons-made-with-tailwind.mdx": {
	id: "2023/11/a-set-of-sign-In-with-google-buttons-made-with-tailwind.mdx";
  slug: "2023/11/a-set-of-sign-in-with-google-buttons-made-with-tailwind";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024/02/how-to-build-a-survey-with-kwesforms-and-astro.mdx": {
	id: "2024/02/how-to-build-a-survey-with-kwesforms-and-astro.mdx";
  slug: "2024/02/how-to-build-a-survey-with-kwesforms-and-astro";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024/02/how-to-use-qwik-use-visible-task.mdx": {
	id: "2024/02/how-to-use-qwik-use-visible-task.mdx";
  slug: "2024/02/how-to-use-qwik-use-visible-task";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024/02/the-qwik-astro-audiofeed-experiment.mdx": {
	id: "2024/02/the-qwik-astro-audiofeed-experiment.mdx";
  slug: "2024/02/the-qwik-astro-audiofeed-experiment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024/06/how-to-use-google-application-json-credentials-in-environment-variables.mdx": {
	id: "2024/06/how-to-use-google-application-json-credentials-in-environment-variables.mdx";
  slug: "2024/06/how-to-use-google-application-json-credentials-in-environment-variables";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024/07/how-to-use-postgresql-ssl-certificates-in-github-actions.mdx": {
	id: "2024/07/how-to-use-postgresql-ssl-certificates-in-github-actions.mdx";
  slug: "2024/07/how-to-use-postgresql-ssl-certificates-in-github-actions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2025/02/how-to-send-email-using-github-actions.mdx": {
	id: "2025/02/how-to-send-email-using-github-actions.mdx";
  slug: "2025/02/how-to-send-email-using-github-actions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2025/03/how-to-use-hugging-face-inference-endpoints-with-javascript.mdx": {
	id: "2025/03/how-to-use-hugging-face-inference-endpoints-with-javascript.mdx";
  slug: "2025/03/how-to-use-hugging-face-inference-endpoints-with-javascript";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2025/03/how-to-use-neons-mcp-server-with-react-server-components.mdx": {
	id: "2025/03/how-to-use-neons-mcp-server-with-react-server-components.mdx";
  slug: "2025/03/how-to-use-neons-mcp-server-with-react-server-components";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
};
"streams": {
"2021/04/gatsby-deep-dives-with-queen-raae.mdx": {
	id: "2021/04/gatsby-deep-dives-with-queen-raae.mdx";
  slug: "2021/04/gatsby-deep-dives-with-queen-raae";
  body: string;
  collection: "streams";
  data: InferEntrySchema<"streams">
} & { render(): Render[".mdx"] };
"2021/07/gatsby-summer-functions.mdx": {
	id: "2021/07/gatsby-summer-functions.mdx";
  slug: "2021/07/gatsby-summer-functions";
  body: string;
  collection: "streams";
  data: InferEntrySchema<"streams">
} & { render(): Render[".mdx"] };
"2022/06/achieving-performant-creativity-with-gatsby-and-rive.mdx": {
	id: "2022/06/achieving-performant-creativity-with-gatsby-and-rive.mdx";
  slug: "2022/06/achieving-performant-creativity-with-gatsby-and-rive";
  body: string;
  collection: "streams";
  data: InferEntrySchema<"streams">
} & { render(): Render[".mdx"] };
"2022/07/how-to-use-gatsbys-script-component-powered-by-partytown.mdx": {
	id: "2022/07/how-to-use-gatsbys-script-component-powered-by-partytown.mdx";
  slug: "2022/07/how-to-use-gatsbys-script-component-powered-by-partytown";
  body: string;
  collection: "streams";
  data: InferEntrySchema<"streams">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
