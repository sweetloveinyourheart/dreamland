import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TransactionStatus } from "../enums/transaction.enum";
import { Schema as MongooseSchema, Document } from 'mongoose'
import { User } from "src/user/schemas/user.schema";
import { RealEstateType } from "src/real-estate/enum/real-estate.enum";

export type TransactionDocument = Transaction & Document

@Schema({ _id: false })
class TranSactionItem {
    @Prop()
    itemId: string

    @Prop({ enum: RealEstateType })
    itemType: RealEstateType
}

@Schema()
export class Transaction {
    @Prop()
    item: TranSactionItem

    @Prop({ enum: TransactionStatus })
    status: TransactionStatus

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: any

    @Prop()
    createdAt: Date
}

export const transactionSchema = SchemaFactory.createForClass(Transaction)