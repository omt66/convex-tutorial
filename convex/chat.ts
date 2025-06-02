import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const sendMessage = mutation({
    args: {
        user: v.string(),
        body: v.string(),
    },
    handler: async (ctx, args) => {
        console.log("OT: This TypeScript function is running on the server.")
        await ctx.db.insert("messages", {
            user: args.user,
            body: args.body,
        })
    },
})

export const getMessages = query({
    args: {},
    handler: async (ctx) => {
        console.log(`OT: Will get the messages from the database.`)
        console.log("OT: ctx.auth->", await ctx.auth.getUserIdentity())
        const messages = await ctx.db.query("messages").order("desc").take(50)
        // Reverse the list so that it's in a chronological order.
        return messages.reverse()
    },
})