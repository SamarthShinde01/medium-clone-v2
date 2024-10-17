import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// Create users
	const user1 = await prisma.user.create({
		data: {
			name: "John Doe",
			username: "johndoe",
			password: "password123",
			image: "https://example.com/johndoe.jpg",
			bio: "A passionate blogger.",
		},
	});

	const user2 = await prisma.user.create({
		data: {
			name: "Jane Smith",
			username: "janesmith",
			password: "password123",
			image: "https://example.com/janesmith.jpg",
			bio: "Tech enthusiast and writer.",
		},
	});

	// Create posts for user1
	const post1 = await prisma.post.create({
		data: {
			title: "The Future of AI",
			shortContent: "AI is advancing at an unprecedented rate.",
			content:
				"In-depth analysis on the future trends in AI and how it will shape the world.",
			image: "https://example.com/ai-future.jpg",
			user: {
				connect: { id: user1.id }, // Link to user1
			},
		},
	});

	const post2 = await prisma.post.create({
		data: {
			title: "Understanding TypeScript",
			shortContent: "Why TypeScript is essential for modern web development.",
			content: "An introduction to TypeScript and its benefits for developers.",
			image: "https://example.com/typescript.jpg",
			user: {
				connect: { id: user2.id }, // Link to user2
			},
		},
	});

	// Create bookmarks (user1 bookmarks post2)
	const bookmark = await prisma.bookmark.create({
		data: {
			user: {
				connect: { id: user1.id }, // Link to user1
			},
			post: {
				connect: { id: post2.id }, // Link to post2
			},
		},
	});

	// Create comments on posts
	const comment1 = await prisma.comment.create({
		data: {
			comment: "Great post! Very insightful.",
			user: {
				connect: { id: user2.id }, // Comment by user2
			},
			post: {
				connect: { id: post1.id }, // On post1
			},
		},
	});

	const comment2 = await prisma.comment.create({
		data: {
			comment: "Thanks for the information. Really helpful!",
			user: {
				connect: { id: user1.id }, // Comment by user1
			},
			post: {
				connect: { id: post2.id }, // On post2
			},
		},
	});

	console.log({ user1, user2, post1, post2, bookmark, comment1, comment2 });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
