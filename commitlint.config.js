/**
 * @doc:commitlint.doc.png
 * https://github.com/commitizen/cz-cli
 * feat:             feature, 表示新增了一个新功能
 * fix:              表示这是一次bug fix
 * improvement:      对现有功能的完善
 * docs:             仅仅只是改变了文档类的文件，如readme.txt
 * revert:           表示对以前的commit的撤回
 * style:            只改变代码外观不改变代码功能 (如代码空格, 代码格式化, 行末冒号, 等等)
 * refactor:         表示这是一次代码重构
 * perf:             性能优化  *取自单词performance
 * test:             增加或改变了测试代码
 * chore:            其他不改变src或者test这两个文件夹的东西的一个commit
 * build/config:            改变了构建配置类的文件，比如package.json增加打包命令，修改webpack的配置，修改.babelrc
 * ci:               ci指的是持续集成。那么这里的意思是这是个改变CI配置的commit，比如Travis
 */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['chore', 'feat', 'fix', 'test', 'perf', 'style', 'merge', 'config', 'improvement']]
    }
};
