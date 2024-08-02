'use client'

import { useEffect, useState } from "react";
import { getArticle, deleteArticle, updateArticle } from "@/app/API/UserAPI";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const params = useParams();
    const articleId = Number(params?.id);
    const [articleList, setArticleList] = useState([] as any[]);
    const [article, setArticle] = useState(null as any);
    const [articleTitle, setArticleTitle] = useState(null as any);
    const [articleContent, setArticleContent] = useState(null as any);
    

    useEffect(() => {
        getArticle(articleId)
            .then(r => {
                setArticle(r);
                setArticleTitle(r.title);
                setArticleContent(r.content);
                const interval = setInterval(() => { setIsLoading(true); clearInterval(interval) }, 100);
            })
            .catch(e => console.log(e));
    }, [articleId]);


    const handleDelete = async (articleId: number) => {
        try {
            await deleteArticle(articleId);
            setArticleList(prevArticles => prevArticles.filter(article => article.id !== articleId));
            alert('게시글이 삭제되었습니다.');
            router.push('/');
        } catch (error) {
            console.error('게시글 삭제 중 오류 발생:', error);
            alert('게시글 삭제에 실패했습니다.');
        }
    };

    const handleUpdate = async () => {
        try {
            await updateArticle({
                articleId: articleId,
                title: articleTitle,
                content: articleContent
            });
            alert('게시글이 수정되었습니다.');
            router.push('/');
        } catch (error) {
            console.error('게시글 수정 중 오류 발생:', error);
            alert('게시글 수정에 실패했습니다.');
        }
    };


    return (
        <div className="h-[1500px] w-[2000px] bg-white flex justify-start items-center flex-col">
      
            <div className="flex flex-col w-[935px] h-[600px] items-end">
                {article ? (
                    <div>
                        <div className="flex">
                            <p>제목</p>
                            <input className="border-2 w-[900px]" type="text" defaultValue={article.title} onChange={e => setArticleTitle(e.target.value)} />
                        </div>
                        <div className="flex">
                            <p>내용</p>
                            <input className="border-2 w-[900px] h-[300px]" type="text" defaultValue={article.content} onChange={e => setArticleContent(e.target.value)} />
                        </div>
                    </div>
                ) : (
                    <span>Loading article details...</span>
                )}
                <button className="w-[100px] bg-red-400" onClick={() => handleDelete(article.id)}>삭제</button>
                <button className="w-[100px] bg-yellow-200" onClick={() => handleUpdate()}>수정</button>
                <button className="w-[100px] bg-green-200" onClick={() => router.push('/')}>메인화면 이동</button>
            </div>
        </div>
    );
}
