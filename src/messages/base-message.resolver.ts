import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { IDataLoaders } from 'src/dataloader/dataloader.interface';
import { ChannelMember } from '../users/entities/channel-member.entity';
import { BaseMessage } from './interfaces/base-message.interface';

@Resolver(() => BaseMessage)
export class MessageInterfaceResolver {
  @ResolveField('author', () => ChannelMember)
  getAuthor(@Parent() message: BaseMessage, @Context('loaders') loaders: IDataLoaders) {
    const { authorId } = message;
    return loaders.messageAuthorsLoader.load(authorId);
  }

  @ResolveField('mentions', () => [ChannelMember])
  getMentions(@Parent() message: BaseMessage, @Context('loaders') loaders: IDataLoaders) {
    return loaders.messageMentionsLoader.load(message.id);
  }
}
