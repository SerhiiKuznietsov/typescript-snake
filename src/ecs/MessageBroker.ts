export type QueueNameType = string;

export class MessageBroker {
  private queues: Map<QueueNameType, any[]> = new Map();

  public publish(queueName: QueueNameType, message: any): this {
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, []);
    }

    this.queues.get(queueName)!.push(message);

    return this;
  }

  public peek(queueName: QueueNameType): any[] {
    return this.queues.get(queueName) || [];
  }

  public consume(queueName: QueueNameType): any[] {
    const messages = this.queues.get(queueName) || [];
    this.queues.delete(queueName);
    return messages;
  }

  public deleteMessage(queueName: QueueNameType, message: any): void {
    const queue = this.queues.get(queueName);
    if (!queue) return;

    const index = queue.indexOf(message);
    if (index !== -1) {
      queue.splice(index, 1);
    }
  }

  public clearQueue(queueName: QueueNameType): void {
    this.queues.delete(queueName);
  }

  public clearAll(): void {
    this.queues.clear();
  }
}
