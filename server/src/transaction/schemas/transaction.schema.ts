import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TransactionStatus } from "../enums/transaction.enum";
import { Schema as MongooseSchema, Document } from 'mongoose'
import { RealEstateType } from "src/real-estate/enum/real-estate.enum";

export type TransactionDocument = Transaction & Document

@Schema({ _id: false })
class RealEstateTransaction {
    @Prop()
    itemId: string

    @Prop({ enum: RealEstateType })
    itemType: RealEstateType
}

@Schema({ _id: false })
class ProjectTransaction {
    @Prop()
    itemId: string
}

@Schema()
export class Transaction {
    @Prop()
    realEstate: RealEstateTransaction

    @Prop()
    project: ProjectTransaction

    @Prop({ enum: TransactionStatus })
    status: TransactionStatus

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: any

    @Prop()
    createdAt: Date
}

export const transactionSchema = SchemaFactory.createForClass(Transaction)