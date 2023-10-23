import type LinkValue from "@/types/LinkValue";
import type RowValue from "@/types/RowValue";
import type HeaderValue from "@/types/HeaderValue";

export default interface ModelsTable {
  title: string;
  links: LinkValue[];
  header: HeaderValue[];
  rows: RowValue[][];
}
