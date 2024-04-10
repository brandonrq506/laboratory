import { useScroll } from "@/hooks";

const ScrollLayout = ({ children }: { children: React.ReactNode }) => {
  const progress = useScroll();

  return (
    <>
      <h2 className="fixed rounded-md bg-white p-3 shadow-md">
        Progress: {progress}%
      </h2>
      {children}
    </>
  );
};

const Content = () => {
  console.count("ScrollGood Content");

  return (
    <div>
      <h1>Content Title</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eos
        recusandae voluptas fugiat repellendus sit doloribus, voluptate
        laudantium consectetur autem rerum in quod temporibus ut soluta
        accusamus maiores quisquam ea. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aliquid tempore doloribus eum sequi odio, voluptas
        nesciunt aut, quae eius maxime, qui dolorem consequuntur maiores
        doloremque enim soluta mollitia voluptatem dicta.
      </p>
    </div>
  );
};

export const ScrollGood = () => {
  console.count("ScrollGood");

  return (
    <ScrollLayout>
      <Content />
    </ScrollLayout>
  );
};
