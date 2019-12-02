import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import Package, { HeadTags } from "../../types";

const getCurrentEntity = ({ state }) => {
  const data = state.source.get(state.router.link);

  if (data.isPostType) {
    const { type, id } = data;
    return state.source[type][id];
  }

  if (data.isTaxonomy) {
    const { taxonomy, id } = data;
    return state.source[taxonomy][id];
  }

  if (data.isAuthor) {
    const { id } = data;
    return state.source.author[id] as any;
  }

  if (data.isPostTypeArchive) {
    const { type } = data;
    return (state.source as any).type[type];
  }

  return null;
};

const getCurrentHeadTags = ({ state }): HeadTags => {
  const entity = getCurrentEntity({ state });
  return entity ? entity["head-tags"] : [];
};

const Root: React.FC<Connect<Package>> = ({ state }) => {
  const headTags = getCurrentHeadTags({ state });
  return (
    <Head>
      {headTags.map(({ tag: Tag, attributes, content }, index) => {
        return (
          <Tag key={index} {...attributes}>
            {content}
          </Tag>
        );
      })}
    </Head>
  );
};

export default connect(Root);