'use server'

import { CreateEventParams } from "@/types"
import { connectToDatabase } from "../Database"
import User from "../Database/models/user.model"
import Event from "../Database/models/event.model"
import { handleError } from "../utils"



export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase()

    const organizer = await User.findById(userId)
    if (!organizer) throw new Error('Organizer not found')

    const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId })
    // revalidatePath(path)

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
  }
}