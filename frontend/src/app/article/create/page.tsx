'use client'

import { useEffect, useState } from "react";
import { getArticle, postArticle } from "@/app/API/UserAPI";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const params = useParams();
    const articleId = Number(params?.id);
    const [article, setArticle] = useState(null as any);
    const [articleTitle, setArticleTitle] = useState(null as any);
    const [articleContent, setArticleContent] = useState(null as any);



    const handlePost = async () => {
        try {
            await postArticle({
                title: articleTitle,
                content: articleContent
            });
            alert('게시글이 등록되었습니다.');
            router.push('/');
        } catch (error) {
            console.error('게시글 등록 중 오류 발생:', error);
            alert('게시글 등록에 실패했습니다.');
        }
    };


    return (
        <div className="h-[1500px] w-[2000px] bg-white flex justify-start items-center flex-col">
            <div className="flex flex-col w-[935px] h-[600px] items-center">
                <div>
                    <div className="flex">
                        <p>제목</p>
                        <input
                            className="border-2 w-[900px]"
                            type="text"
                            value={articleTitle}
                            onChange={e => setArticleTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex">
                        <p>내용</p>
                        <input
                            className="border-2 w-[900px] h-[300px]"
                            type="text"
                            value={articleContent}
                            onChange={e => setArticleContent(e.target.value)}
                        />
                    </div>
                </div>
                <button className="w-[100px] bg-blue-200" onClick={() => handlePost()}>게시글 등록</button>
            </div>
        </div>
    );
}
