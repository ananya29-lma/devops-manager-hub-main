import { Children, cloneElement, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * Wraps every word of `node` in a `.word-3d` span so each word pops forward
 * in 3D on hover (neighbours follow like a ripple — CSS in styles.css).
 * Gradient-text spans are kept whole, because transforming pieces of
 * clipped-gradient text makes them disappear in some browsers.
 */
export function splitWords(node: ReactNode, key = "w"): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, i) =>
      part === "" || /^\s+$/.test(part) ? (
        part
      ) : (
        <span key={`${key}-${i}`} className="word-3d">
          {part}
        </span>
      ),
    );
  }
  if (typeof node === "number") return <span className="word-3d">{node}</span>;
  if (Array.isArray(node)) {
    return Children.toArray(node).map((child, i) => <Fragment key={`${key}-${i}`}>{splitWords(child, `${key}-${i}`)}</Fragment>);
  }
  if (isValidElement(node)) {
    const el = node as ReactElement<{ className?: string; children?: ReactNode }>;
    const { className, children } = el.props;
    if (el.type === Fragment) return splitWords(children, key);
    if (typeof className === "string" && className.includes("text-gradient")) {
      return <span className="word-3d">{el}</span>;
    }
    if (children === undefined || children === null) return el;
    return cloneElement(el, undefined, splitWords(children, key));
  }
  return node;
}

export function Words3D({ children }: { children: ReactNode }) {
  return <>{splitWords(children)}</>;
}
